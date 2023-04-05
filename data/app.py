import numpy as np
from flask import Flask, request
import pandas as pd
from surprise import Reader, SVD
from surprise.dataset import DatasetAutoFolds
from scipy.sparse import coo_matrix
from collections import Counter

app = Flask(__name__)


def cosine_similarity(v1, v2):
    dot_product = np.dot(v1, v2.T)
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    if norm_v1 == 0 or norm_v2 == 0:
        return 0
    else:
        return dot_product / (norm_v1 * norm_v2)


@app.route('/recommend', methods=['POST'])
def getRecommendList():
    data = request.get_json()
    user_id = data['flaskSurveyItem']['userId']
    theme_id = data['flaskSurveyItem']['travelThemeCode']
    season_name = data['flaskSurveyItem']['season']
    selected_subcategory_id = data['flaskSurveyItem']['surveyFavorCategoryList']
    place = pd.DataFrame.from_dict(data['flaskJejuPlaceItemList'])
    ratings = pd.DataFrame.from_dict(data['flaskReviewItemList'])
    selected_place = []
    # selected_place = data["flaskSceduleList"]

    selected_category_name = place["categoryName"].unique().tolist()
    if not selected_place:
        place = place[~place["jejuPlaceId"].isin(selected_place)]
    # min_count = 0 # 최소 0번이상 리뷰를 작성한 사용자의 리뷰만 사용 => 현재는 미적용, 데이터가 쌓이면 적용
    # rating_counts = ratings['userId'].value_counts()
    # ratings = ratings[ratings['userId'].isin(rating_counts[rating_counts > min_count].index)]
    print(data['flaskSurveyItem'])
    print(ratings)
    schedule = ratings.groupby(['scheduleId', 'travelThemeCode', 'season'])['jejuPlaceId'].apply(list).reset_index(
        name='course')
    ratings = ratings.drop_duplicates(['userId', 'jejuPlaceId'], keep='last')  # 동일 유저 동일 장소 중복 리뷰 처리

    '''STEP 1. 선호 카테고리의 장소에 대한 평점 신뢰도를 반영힌 평점 계산(사용자 평가 평점 * 리뷰 개수를 이용한 신뢰도 수치)'''
    print(place['reviewCount'])
    place['reviewScore'] = place.apply(
        lambda x: (x['reviewScoreSum'] / x['reviewCount']) if x['reviewCount'] > 0 else 0, axis=1)
    place['reviewReliability'] = pd.qcut(place['reviewCount'], q=4,
                                         labels=[score / 10 for score in range(7, 11)]).astype(
        np.float32)  # (0.7 ~ 1.0)
    place['score'] = place['reviewScore'] * place['reviewReliability']
    place = place.sort_values('score', ascending=False)

    '''STEP 2. 모든 장소에 대한 예상 평점 계산'''
    reader = Reader(rating_scale=(0, 5))
    data_folds = DatasetAutoFolds(df=ratings[["userId", "jejuPlaceId", "score"]], reader=reader)
    trainset = data_folds.build_full_trainset()
    # sim_options = {'name': 'cosine', 'user_based': True}
    # algo = KNNBaseline(sim_options=sim_options)
    algo = SVD()
    algo.fit(trainset)
    # item_list = ratings[ratings["categoryId"].isin(selected_subcategory_id)]["jejuPlaceId"].unique().tolist()
    item_list = place["jejuPlaceId"].unique().tolist()
    print(item_list)
    predictions = [algo.predict(user_id, item_id) for item_id in item_list]
    predictions = pd.DataFrame(predictions)[["iid", "est"]]  # uid, iid, r_ui(실제 평점) ,est(예측평점)
    # print(predictions)
    predictions.rename(columns={"iid": "jejuPlaceId"}, inplace=True)
    place = pd.merge(place, predictions, on='jejuPlaceId')
    place["prediction"] = place["score"] + place["est"]
    print(place)

    '''STEP 3. 모든 사용자의 일정과 현재 입력된 일정간 유사도 계산(설문 유사도 & 일정 유사도)'''
    visited_mat = coo_matrix(
        (np.ones(len(ratings), dtype=np.int8), (ratings["scheduleId"], ratings["jejuPlaceId"]))).toarray()
    visited_mat = visited_mat[:, selected_place].tolist()
    my_course = np.ones(len(selected_place), dtype=np.int8)
    schedule["survey_similarity"] = schedule.apply(
        lambda x: 1.0 if x['travelThemeCode'] == theme_id and x['season'] == season_name else
        (0.5 if x['travelThemeCode'] == theme_id or x['season'] == season_name else 0), axis=1)
    if selected_place:
        schedule["vec"] = schedule["scheduleId"].apply(lambda x: visited_mat[x])
        schedule["course_similarity"] = schedule.apply(lambda x: cosine_similarity(schedule["vec"], my_course), axis=1)
        schedule = schedule[schedule["course_similarity"] > 0 and schedule["survey_similarity"] > 0]
        schedule["similarity"] = (schedule["course_similarity"] + schedule["survey_similarity"]) >> 1
    else:
        schedule.rename(columns={"survey_similarity": "similarity"}, inplace=True)
        schedule = schedule[schedule["similarity"] > 0]
    # schedule = schedule[schedule["similarity"] >= 0.5] # 현재는 미적용, 데이터가 쌓이면 적용

    '''STEP 4. 각 일정을 유사도로 그룹화하여 높은 유사도의 그룹 속 장소들을 상위에 추천(유사도-출연빈도 순으로 정렬)'''
    grouped_by_similarity = schedule.groupby('similarity')['course'].apply(list).reset_index(name='visited_place')
    print(schedule)
    print(grouped_by_similarity)
    grouped_by_similarity = grouped_by_similarity.sort_values('similarity', ascending=True)
    grouped_by_similarity["visited_place"] = grouped_by_similarity["visited_place"].apply(lambda x: Counter(sum(x, [])))
    grouped_by_similarity["visited_place"] = grouped_by_similarity["visited_place"].apply(
        lambda x: sorted(x, key=x.get, reverse=True))
    print(grouped_by_similarity)

    top_recommend_place_id = []
    for place_id_list in grouped_by_similarity["visited_place"].values:
        for id in place_id_list:
            if id not in top_recommend_place_id:
                top_recommend_place_id.append(id)
    ranked_place = pd.DataFrame()
    # print(place.sort_values('jejuPlaceId', ascending=False))
    for id in top_recommend_place_id:
        ranked_place = pd.concat([ranked_place, place[place["jejuPlaceId"] == id]])
    place.drop(place[place["jejuPlaceId"].isin(top_recommend_place_id)].index, inplace=True)
    print(len(place))

    place = place.sort_values('prediction', ascending=False)
    ranked_place = pd.concat([ranked_place, place])

    result = {}
    result_size = 20
    grouped_place = ranked_place.groupby('categoryName')['jejuPlaceId'].apply(list)
    for name in selected_category_name:
        result[name] = grouped_place[name][:result_size]
    print(result)
    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
