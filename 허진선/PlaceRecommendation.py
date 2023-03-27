import numpy as np
import pandas as pd
from random import *
from lightfm import LightFM
from lightfm.data import Dataset
from lightfm.cross_validation import random_train_test_split
from lightfm.evaluation import precision_at_k, auc_score
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


def recommendation_ver1():
    # https://towardsdatascience.com/build-a-machine-learning-recommender-72be2a8f96ed
    # https://www.kaggle.com/code/parthplc/interview-building-recommendation-system-lightfm
    # https://gitee.com/fruitwater/recommenders/blob/master/examples/02_model_hybrid/lightfm_deep_dive.ipynb
    # https://github.com/V-Sher/LightFm_HybridRecommenderSystem/blob/master/LightFM%20Worked%20Example.ipynb
    survey = pd.read_pickle('survey.pkl')
    place = pd.read_pickle('place.pkl')
    course = pd.read_pickle('course.pkl')

    '''[1] Prepare the Data'''
    # mappings in course data
    dataset = Dataset()
    dataset.fit((course['일정id'].unique()), (course['장소id'].unique()))

    # feature mappings for user_features and model_features.
    # dataset.fit_partial(items=(place['장소id'].unique()),
    #                     users=(survey['일정id'].unique()),
    #                     item_features=(place['카테고리'].unique()),
    #                     user_features=(survey['나이'].unique()))
    dataset.fit_partial(items=([i for i in range(len(place))]),
                        users=([i for i in range(len(survey))]),
                        item_features=(place['카테고리'].unique()),
                        user_features=(survey['나이'].unique()))
    num_users, num_items = dataset.interactions_shape()
    print(f"num_users, num_items = {num_users}, {num_items}")

    # build the interactions matrix
    (interactions, weights) = dataset.build_interactions(
        (course['일정id'][i], course['장소id'][i]) for i in range(len(course)))
    print([(course['일정id'][i], course['장소id'][i]) for i in range(len(course))])

    print(repr(interactions))
    print(interactions.toarray())

    # build the item_features and user_features
    # return objects of type sparse.coo_matrix as required by LightFM
    item_features = dataset.build_item_features((place['장소id'][i], [place['카테고리'][i]]) for i in range(len(place)))
    user_features = dataset.build_user_features((survey['일정id'][i], [survey['나이'][i]]) for i in range(len(survey)))

    '''[2] Specifying the Model'''
    # specify the model with the WARP loss function
    model = LightFM()

    '''[3] Training the Model'''
    # training, test = random_train_test_split(interactions, test_percentage=0.1, random_state=1)
    model.fit(interactions=interactions, epochs=2, item_features=item_features, user_features=user_features)

    '''[4] Making predictions using the Model'''
    user_id = len(course)
    new_user_feature = dataset.build_user_features((user_id, [0]))
    scores = model.predict(user_ids=user_id, item_ids=np.arange(num_items), item_features=item_features, user_features=new_user_feature)
    # labels = np.array(course['장소id'].unique())
    # scores = model.predict(user_ids=user_id, item_ids=np.arange(num_items), item_features=item_features,
    #                        user_features=user_features)
    # top_items_for_user = labels[np.argsort(-scores)]
    # for x in top_items_for_user:
    #     print("     %s" % x)

    # # 예측 결과 확인
    # item_id = 0
    # num_search_items = 5
    #
    # item_biases, item_embeddings = model.get_item_representations(features=item_features)
    # # print(len(item_embeddings)) # 모든 장소 20개에 대해 임베딩
    #
    # scores = item_embeddings.dot(item_embeddings[item_id])  # (10000, )
    # item_norms = np.linalg.norm(item_embeddings, axis=1)  # (10000, )
    # item_norms[item_norms == 0] = 1e-10
    # scores /= item_norms
    # best = np.argpartition(scores, -num_search_items)[-num_search_items:]
    # similar_item_id_and_scores = sorted(zip(best, scores[best] / item_norms[item_id]),
    #                                     key=lambda x: -x[1])
    # # print(similar_item_id_and_scores)
    #
    # best_items = pd.DataFrame(columns=['장소id', '카테고리', '유사도'])
    # for similar_item_id, score in similar_item_id_and_scores:
    #     place_id = similar_item_id
    #     category_id = place[place['장소id'] == place_id].values[0][1]
    #     sim = int(score * 100)
    #
    #     row = pd.Series([place_id, category_id, sim], index=best_items.columns)
    #     best_items = pd.concat([best_items, row.to_frame().T], ignore_index=True)
    #
    # print(tabulate(best_items, headers='keys', tablefmt='psql'))


def recommendation_ver2():
    survey = pd.read_pickle('survey.pkl')
    place = pd.read_pickle('place.pkl')
    course = pd.read_pickle('course.pkl')
    print(f"-----설문({len(survey)})")
    print(survey.head())
    print(f"-----장소({len(place)})")
    print(place.head())
    print(f"-----코스({len(course)})")
    print(course.head())
    print("-----------------------------------------------------------------")
    # 장소 id 리스트
    # place_counts = course["장소id"].value_counts()

    dataset = Dataset()
    dataset.fit((course['일정id']), (course['장소id']))
    dataset.fit_partial(items=(place['장소id']),
                        item_features=(place['카테고리']))
    # dataset.fit_partial(items=(place['장소id']),
    #                     item_features=(place['평점']))
    dataset.fit_partial(users=(survey['일정id']),
                        user_features=(survey['나이']))

    (interactions, weights) = dataset.build_interactions(
        (course['일정id'][i], course['장소id'][i]) for i in range(len(course)))

    item_features = dataset.build_item_features(((place['장소id'][i], [place['카테고리'][i]]) for i in range(len(place))))
    user_features = dataset.build_user_features(((survey['일정id'][i], [survey['나이'][i]])
                                                 for i in range(len(survey))))

    training, test = random_train_test_split(interactions, test_percentage=0, random_state=0)
    # print(repr(test))
    # print(test.toarray())

    model = LightFM()
    model.fit(interactions=training, epochs=3, item_features=item_features, user_features=user_features)

    # test_precision = precision_at_k(model, test, item_features=item_features, user_features=user_features, k=5).mean()
    # train_auc = auc_score(model, test, item_features=item_features, user_features=user_features).mean()
    # print("test precision: ", test_precision)
    # print("test AUC: ", train_auc)

    # 예측 결과 확인
    item_id = 0
    num_search_items = 5

    item_biases, item_embeddings = model.get_item_representations(features=item_features)
    # print(len(item_embeddings)) # 모든 장소 20개에 대해 임베딩

    scores = item_embeddings.dot(item_embeddings[item_id])  # (10000, )
    item_norms = np.linalg.norm(item_embeddings, axis=1)  # (10000, )
    item_norms[item_norms == 0] = 1e-10
    scores /= item_norms
    best = np.argpartition(scores, -num_search_items)[-num_search_items:]
    similar_item_id_and_scores = sorted(zip(best, scores[best] / item_norms[item_id]),
                                        key=lambda x: -x[1])
    print(similar_item_id_and_scores)

    best_items = pd.DataFrame(columns=['장소id', '카테고리'])
    for similar_item_id, score in similar_item_id_and_scores:
        place_id = similar_item_id
        category_id = place[place['장소id'] == place_id].values[0][1]

        row = pd.Series([place_id, category_id], index=best_items.columns)
        best_items = pd.concat([best_items, row.to_frame().T], ignore_index=True)

    print(best_items)


if __name__ == '__main__':
    # make_data()
    recommendation_ver1()
