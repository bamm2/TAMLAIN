from random import randint
import numpy as np
import pandas as pd
from surprise import KNNBaseline, Dataset, Reader, SVDpp, SVD
from tabulate import tabulate


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

    user_items = df[(df['일정id'] == course_id)].copy() # 어떤 일정의 장소들만 추출
    # 코스(course_id)의  장소(x)의 예측 평점, 각 장소들의 예측 평점을 계산
    user_items['est'] = user_items['장소id'].apply(
        # lambda x: 0.8 * svdpp.predict(course_id, x).est + 0.2 * knnbaseline_item.predict(course_id, x).est)
        lambda x: knnbaseline_item.predict(course_id, x).est)

    # user_items = user_items.sort_values(by='est', ascending=False)
    print(tabulate(user_items, headers='keys', tablefmt='psql'))

    # Popularity 모델 (category별 popularity)
    # top_category_list = user_top_category(course_id)
    # print("Course top place list: ", top_category_list)
    # popular_item = []
    # for top_category in top_category_list:
    #     popular_item.extend(category_based_popularity(top_category))
    # print("Final list: ", popular_item)



if __name__ == '__main__':
    survey = pd.read_pickle('survey.pkl').drop(columns='카테고리') # 나이
    place = pd.read_pickle('place.pkl') # 카테고리
    course = pd.read_pickle('course.pkl') # 장소, 평점

    # 테이블 하나로 합치기
    df = pd.merge(left=course, right=survey, how="inner", on="일정id")
    df = pd.merge(left=df, right=place, how="inner", on="장소id")
    print(tabulate(df, headers='keys', tablefmt='psql'))
    # print(course.isna().sum())
    # print(course['평점'].value_counts())

    reader = Reader(rating_scale=(1, 5))
    trainset = Dataset.load_from_df(df[['일정id', '장소id', '평점']][:-5], reader)  # user id, item id and ratings
    trainset = trainset.construct_trainset(trainset.raw_ratings)
    testset = Dataset.load_from_df(df[['일정id', '장소id', '평점']][-5:], reader)  # user id, item id and ratings
    testset = testset.construct_testset(testset.raw_ratings)

    # CBF(trainset, testset)
    # CF(trainset, testset)

    hybrid_and_popularity(0, df)
