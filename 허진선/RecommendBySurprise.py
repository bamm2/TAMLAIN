from random import randint
import numpy as np
import pandas as pd
from surprise import KNNBaseline, Dataset, Reader, SVDpp, SVD
from tabulate import tabulate


age = ["10대", "20대", "30대", "40대"]
thema = ["매운음식투어", "전통음식투어", "건강한음식투어"]
category = ["한식", "양식", "일식", "중식", "양식", "아시아"]


def make_data():
    survey_df = pd.DataFrame(columns=["나이", "카테고리"])
    place_df = pd.DataFrame(columns=["장소id", "카테고리"])
    course_df = pd.DataFrame(columns=["일정id", "장소id"])

    # 40개 일정 정보 생성
    for s in range(len(age)):
        # for t in range (len(thema)) :
        for c in range(len(category)):
            survey_df.loc[len(survey_df)] = [s, c]
        for c in range(len(category)):
            survey_df.loc[len(survey_df)] = [s, c]
    # step = [7, 12, 5, 11]
    step = [7]
    for s in range(len(step)):
        for i in range(0, len(survey_df), step[s]):
            survey_df.drop(i, inplace=True)
        survey_df.reset_index(drop=True, inplace=True)

    survey_df["일정id"] = [i for i in range(len(survey_df))]
    print(survey_df)

    # 20개 장소 생성
    idx = 0
    for i in range(20):
        if idx == 6: idx = 0
        place_df.loc[len(place_df)] = [i, idx]
        idx += 1
    print(place_df)

    # 각 일정 코스 생성
    for i in range(len(survey_df)):
        place_list = []
        for j in range(randint(2, 4)):  # 방문 장소 2~4개
            place_id = randint(0, len(place_df) - 1)
            if place_id in place_list:
                j -= 1
                continue
            place_list.append(place_id)
            course_df.loc[len(course_df)] = [i, place_id]
    course_df["평점"] = [randint(1, 5) for i in range(len(course_df))]
    print(course_df)

    survey_df.to_pickle('survey.pkl')
    place_df.to_pickle('place.pkl')
    course_df.to_pickle('course.pkl')

    survey_df.to_excel('survey.xlsx')
    place_df.to_excel('place.xlsx')
    course_df.to_excel('course.xlsx')


def test_model(model, testset):
    predictions = model.test(testset)
    pred_df = pd.DataFrame(predictions)  # uid, iid, r_ui(실제 평점) ,est(예측평점)
    print(tabulate(pred_df, headers='keys', tablefmt='psql'))
    # file_name = 'KnnBaseline_model_i'
    # dump.dump(file_name, algo=predictions)
    # _, loaded_algo = dump.load(file_name)
    # accuracy.rmse(predictions)
    # accuracy.mae(predictions)


def CBF(trainset, testset):
    # actual_k: the actual number of neighbors

    # content-based filtering (CBF)
    knnbaseline_item = KNNBaseline(sim_options={'name': 'cosine', 'user_based': False})
    knnbaseline_item.fit(trainset)
    test_model(knnbaseline_item, testset)

    # user-based filtering (CBF)
    knnbaseline_user = KNNBaseline(sim_options={'name': 'cosine', 'user_based': True})
    knnbaseline_user.fit(trainset)
    test_model(knnbaseline_user, testset)


def CF(trainset, testset):
    svd = SVD()
    svd.fit(trainset)
    test_model(svd, testset)

    svdpp = SVDpp()
    svdpp.fit(trainset)
    test_model(svdpp, testset)


# 카테고리별 상위 popularity 순으로 반환
def category_based_popularity(category, data):
    mask = data.category.apply(lambda x: category in x)
    filtered_item = data[mask]
    filtered_item = filtered_item.sort_values(by='평점', ascending=False)
    return filtered_item['장소id'].head(10).values.tolist()


def user_top_category(course_id, df):
    idx_to_category_r = {}  # 카테고리 인덱스 사전
    course_id = df['일정id'][(df['일정id'] == course_id)].values[0].copy()
    print("Course vec: ", course_id)
    top_category_indices = np.flip(np.argsort(course_id))
    category_list = []
    for i in top_category_indices[:3]:
        category_list.append(idx_to_category_r[i])
    return category_list


def hybrid_and_popularity(course_id, df):  # search_id : 장소 추천을 받기 위한 일정 id
    # 하이브리드 필터링 : CF(SVDpp) + CBF(knnbaseline-item-based)
    knnbaseline_item = KNNBaseline(sim_options={'name': 'cosine', 'user_based': False})
    knnbaseline_item.fit(trainset)
    svdpp = SVDpp()
    svdpp.fit(trainset)

    user_items = df[(df['일정id'] == course_id)].copy()
    user_items['est'] = user_items['장소id'].apply(
        lambda x: 0.8 * svdpp.predict(course_id, x).est + 0.2 * knnbaseline_item.predict(course_id, x).est)
    user_items = user_items.sort_values(by='est', ascending=False)
    print(tabulate(user_items, headers='keys', tablefmt='psql'))

    # Popularity 모델 (category별 popularity)
    # top_category_list = user_top_category(course_id)
    # print("Course top place list: ", top_category_list)
    # popular_item = []
    # for top_category in top_category_list:
    #     popular_item.extend(category_based_popularity(top_category))
    # print("Final list: ", popular_item)



if __name__ == '__main__':
    survey = pd.read_pickle('survey.pkl')
    place = pd.read_pickle('place.pkl')
    course = pd.read_pickle('course.pkl')

    # print(course.isna().sum())
    # print(course['평점'].value_counts())

    reader = Reader(rating_scale=(1, 5))
    trainset = Dataset.load_from_df(course[['일정id', '장소id', '평점']][:-5], reader)  # user id, item id and ratings
    trainset = trainset.construct_trainset(trainset.raw_ratings)
    testset = Dataset.load_from_df(course[['일정id', '장소id', '평점']][-5:], reader)  # user id, item id and ratings
    testset = testset.construct_testset(testset.raw_ratings)

    # CBF(trainset, testset)
    # CF(trainset, testset)

    hybrid_and_popularity(1, course)
