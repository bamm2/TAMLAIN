import numpy as np
import pandas as pd
from surprise import KNNBaseline, Reader
from surprise.dataset import DatasetAutoFolds
from tabulate import tabulate
from mlxtend.frequent_patterns.fpgrowth import fpgrowth
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import association_rules


def read_data():
    survey = pd.read_pickle('survey.pkl')
    place = pd.read_pickle('jeju_place.pkl')
    course = pd.read_pickle('course.pkl')

    course_list = course.groupby('일정id')['장소id'].apply(list).values.tolist()
    course_list.extend(100 * [course_list[0]])
    course_list.extend(100 * [course_list[1]])

    return place, course, course_list


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
    place['count_rating'] = pd.qcut(place['review_count'], q=10, labels=[score/2 for score in range(1, 11)]).astype(np.float32)
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
    data_folds = DatasetAutoFolds(df=df[['일정id', '장소id', '평점']], reader=reader) # set (계절 id, 테마 id), 장소 id, 평점
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


place, course, course_list = read_data()
# support_df = calc_support(course_list)
# CBF(place)
CF(course)