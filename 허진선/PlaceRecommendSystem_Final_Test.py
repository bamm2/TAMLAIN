from random import randint
import numpy as np
import pandas as pd
from surprise import KNNBaseline, Reader
from surprise.dataset import DatasetAutoFolds
from tabulate import tabulate
from mlxtend.frequent_patterns.fpgrowth import fpgrowth
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import association_rules

계절 = ["여름", "겨울"]
테마 = ["테마1", "테마2"]
카테고리 = ["카테고리1", "카테고리2", "카테고리2"]


def make_data():
    schedule_df = pd.DataFrame(columns=["일정id", "계절id", "테마id", "선택카테고리list"])
    place_df = pd.DataFrame(columns=["장소id", "카테고리id"])
    course_df = pd.DataFrame(columns=["코스id", "일정id", "일차", "장소id"])
    review_df = pd.DataFrame(columns=["리뷰id", "일정id", "장소id", "평점"])

    # 15개 장소 생성
    temp = []
    for i in range(len(카테고리)):
        temp.extend([i] * 5)
    place_df["장소id"] = [i for i in range(len(temp))]
    place_df["카테고리id"] = temp
    # print(place_df)

    # 12개 일정 생성
    temp_계절 = []
    temp_테마 = []
    for i in range(len(계절)):
        for j in range(len(테마)):
            temp_계절.extend([i] * 3)
            temp_테마.extend([j] * 3)
    schedule_df["일정id"] = [i for i in range(len(temp_테마))]
    schedule_df["계절id"] = temp_계절
    schedule_df["테마id"] = temp_테마
    temp = []
    for i in range(len(schedule_df)):
        inner_temp = []
        for j in range(randint(1, len(카테고리))):
            while True:
                cate_id = randint(0, len(카테고리) - 1)
                if cate_id not in inner_temp:
                    inner_temp.append(cate_id)
                    break
        temp.append(inner_temp)
    schedule_df["선택카테고리list"] = temp
    # print(schedule_df)

    # 코스 생성
    temp_일정 = []
    temp_일차 = []
    temp_장소 = []
    for i in range(len(schedule_df)):  # 일정 id
        for j in range(1, randint(1, 2) + 1):  # 일차 1~2
            like_cate = schedule_df[schedule_df["일정id"] == i]["선택카테고리list"].values.tolist()[0]
            like_cate = like_cate[randint(0, len(like_cate) - 1)]
            select_pla = place_df[place_df["카테고리id"] == like_cate]["장소id"].values.tolist()
            select_pla = select_pla[randint(0, len(select_pla) - 1)]
            temp_일정.append(i)
            temp_일차.append(j)
            temp_장소.append(select_pla)

    # print(temp_장소)
    course_df["일정id"] = temp_일정
    course_df["일차"] = temp_일차
    course_df["장소id"] = temp_장소
    course_df["코스id"] = [i for i in range(len(course_df))]
    # print(course_df)

    temp1 = course_df[course_df["일정id"] % 2 == 0][["일정id"]].values.tolist()
    temp2 = course_df[course_df["일정id"] % 2 == 0][["장소id"]].values.tolist()
    temp1 = sum(temp1, [])
    temp2 = sum(temp2, [])
    avg = []
    for i in range(len(temp1)):
        avg.append(randint(1, 5))
    review_df["리뷰id"] = [i for i in range(len(avg))]
    review_df["일정id"] = temp1
    review_df["장소id"] = temp2
    review_df["평점"] = avg
    # print(review_df)

    schedule_df.to_pickle('schedule.pkl')
    place_df.to_pickle('place.pkl')
    course_df.to_pickle('course.pkl')
    review_df.to_pickle('review.pkl')

    schedule_df.to_excel('schedule.xlsx')
    place_df.to_excel('place.xlsx')
    course_df.to_excel('course.xlsx')
    review_df.to_excel('review.xlsx')

    return schedule_df, place_df, course_df, review_df


def read_data():
    schedule = pd.read_pickle('schedule.pkl')
    place = pd.read_pickle('place.pkl')
    course = pd.read_pickle('course.pkl')
    review = pd.read_pickle('review.pkl')

    # course_list = course.groupby('일정id')['장소id'].apply(list).values.tolist()
    # course_list.extend(100 * [course_list[0]])
    # course_list.extend(100 * [course_list[1]])
    print(review)
    merge_df = pd.merge(review, schedule, on="일정id")
    merge_df['c'] = [max(len(a), len(b)) for a, b in zip(merge_df["계절id"], merge_df["테마id")]
    merge_df["new"] = merge_df.apply(lambda x: max([len(x) for x in [merge_df["계절id"], merge_df["테마id"]]]))
    merge_df["new"] = set(merge_df[["계절id", "테마id"]]))

    return schedule, place, course, review


def calc_support(course_list):
    my_transactionencoder = TransactionEncoder()  # One-Hot Encoding 된 DataFrame

    # fit the transaction encoder using the list of transaction tuples
    my_transactionencoder.fit(course_list)

    # transform the list of transaction tuples into an array of encoded transactions
    encoded_transactions = my_transactionencoder.transform(course_list)

    # convert the array of encoded transactions into a dataframe
    encoded_transactions_df = pd.DataFrame(encoded_transactions, columns=my_transactionencoder.columns_)
    print(encoded_transactions_df)

    # our min support is 5, but it has to be expressed as a percentage for mlxtend
    min_support = 1 / len(course_list)  # 아이템 조합의 최소 지지도를 설정(0~1), 어떤 아이템 A의 지지도를 아이템A의 등장횟수 / 전체 횟수로 생각하면 됩니다.
    frequent_itemsets = fpgrowth(encoded_transactions_df, min_support=min_support, use_colnames=True, max_len=2)

    # print the frequent itemsets
    print(frequent_itemsets)

    # Compute the association rules based on the frequent itemsets
    # compute and print the association rules
    # result = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.1)
    result = association_rules(frequent_itemsets, support_only=True, min_threshold=0.01)
    print(tabulate(result, headers='keys', tablefmt='psql'))
    return result


def cosine_similarity(v1, v2):
    dot_product = np.dot(v1, v2.T)  # v2는 (1, len(place_set))이므로 전치해야 함
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    if norm_v1 == 0 or norm_v2 == 0:
        return 0
    else:
        return dot_product / (norm_v1 * norm_v2)


def CBF(place):
    place['star_rating'] = place.apply(
        lambda x: x['review_score_sum'] / x['review_count'] if x['review_count'] != 0 else 0, axis=1)
    place['count_rating'] = pd.qcut(place['review_count'], q=10, labels=[score / 2 for score in range(1, 11)]).astype(
        np.float32)
    print(place.info())
    place['weight_rating'] = place['star_rating'] + place['count_rating']
    place = place[["id", "category_id", "name", "place_url", "star_rating", "count_rating", "weight_rating"]]
    print(tabulate(place, headers='keys', tablefmt='psql', showindex=False))
    selected_category_list = [1]
    filtered_place = place[place['category_id'].isin(selected_category_list)]
    filtered_place = filtered_place.sort_values('star_rating', ascending=False)
    # print(tabulate(filtered_place[["name", "place_url", "weighted_score", "score", "review_count"]], headers='keys', tablefmt='psql'))


def CF(df):
    reader = Reader(rating_scale=(0, 5))
    data_folds = DatasetAutoFolds(df=df[['일정id', '장소id', '평점']], reader=reader)  # set (계절 id, 테마 id), 장소 id, 평점
    trainset = data_folds.build_full_trainset()
    sim_options = {'name': 'cosine', 'user_based': True}
    algo = KNNBaseline(sim_options=sim_options)
    algo.fit(trainset)

    predictions = [algo.predict(200, i) for i in range(1, 21)]  # uid, iid, r_ui(실제 평점) ,est(예측평점)

    def sortkey_est(pred):
        return pred.est

    predictions.sort(key=sortkey_est, reverse=True)
    top_predictions = predictions

    top_place_ids = [int(pred.iid) for pred in top_predictions]
    top_place_rating = [pred.est for pred in top_predictions]
    top_place_pred = [(id, rating) for id, rating in zip(top_place_ids, top_place_rating)]
    print(tabulate(top_place_pred, headers='keys', tablefmt='psql'))
    return top_place_pred

# make_data()
read_data()
# place, course, course_list = read_data()
# support_df = calc_support(course_list)
# CBF(place)
# CF(course)


