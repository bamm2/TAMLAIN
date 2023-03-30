import pandas as pd
from surprise import Reader, SVDpp, SVD, KNNBasic
from tabulate import tabulate
from surprise.dataset import DatasetAutoFolds

# https://nicola-ml.tistory.com/entry/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4%EB%A5%BC-%EC%9C%84%ED%95%9C-%EC%B6%94%EC%B2%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84-3%EC%9E%A5-Scikit-Surprise

survey = pd.read_pickle('survey.pkl').drop(columns='카테고리')  # 나이
place = pd.read_pickle('place.pkl')  # 카테고리
course = pd.read_pickle('course.pkl')  # 장소, 평점
# course["평점"] = 1

df = pd.merge(left=course, right=survey, how="inner", on="일정id")
df = pd.merge(left=df, right=place, how="inner", on="장소id")
print(tabulate(df, headers='keys', tablefmt='psql'))


def get_not_visited_place(df, place_list, course_id):
    # 자주 등장하는 장소 가중치
    total_place = place_list['장소id'].tolist()  # 모든 장소 리스트
    visited_place = df[df['일정id'] == course_id]['장소id'].tolist() # 현재 일정에서 방문 예정인 장소 리스트
    not_visited_place = [place for place in total_place if place not in visited_place] # 현재 일정에 없는 장소 리스트

    print('평점 매긴 장소 수:', len(visited_place), '추천 대상 장소 수:', len(not_visited_place), '전체 장소 수:', len(total_place))
    return not_visited_place


def recomm_place(algo, course_id, not_visited_place, top_n=None):
    predictions = [algo.predict(course_id, place_id) for place_id in not_visited_place]  # uid, iid, r_ui(실제 평점) ,est(예측평점)

    def sortkey_est(pred):
        return pred.est

    predictions.sort(key=sortkey_est, reverse=True)
    top_predictions = predictions[:top_n]

    top_place_ids = [int(pred.iid) for pred in top_predictions]
    top_place_rating = [pred.est for pred in top_predictions]
    top_place_pred = [(id, rating) for id, rating in zip(top_place_ids, top_place_rating)]
    return top_place_pred


reader = Reader(rating_scale=(0, 5))
data_folds = DatasetAutoFolds(df=df[['일정id', '장소id', '평점']], reader=reader)
trainset = data_folds.build_full_trainset()

sim_options = {'name': 'cosine', 'user_based': True}
algo = KNNBasic(sim_options=sim_options)
algo.fit(trainset)

find_course_id = 0
print(algo.get_neighbors(find_course_id, k=5))

not_visited_place = get_not_visited_place(df, place, find_course_id)
top_place_preds = recomm_place(algo, find_course_id, not_visited_place)
print(top_place_preds)
for top_place in top_place_preds:
    print(top_place[0], ":", top_place[1])
