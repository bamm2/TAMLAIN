import numpy as np
import pandas as pd
from scipy.sparse import coo_matrix
from tabulate import tabulate

survey = pd.read_pickle('survey.pkl')
place = pd.read_pickle('jeju_place.pkl')
course = pd.read_pickle('course.pkl')  # 장소, 평점

type_strength = {
    'CBF': 0.2,
    'CB': 0.8
}

# 가중 평균 계산
def weighted_score_average(v, m, R, C):
    return ((v / (v + m)) * R) + ((m / (m + v)) * C)


def cosine_similarity(v1, v2):
    dot_product = np.dot(v1, v2.T)  # v2는 (1, len(place_set))이므로 전치해야 함
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    if norm_v1 == 0 or norm_v2 == 0:
        return 0
    else:
        return dot_product / (norm_v1 * norm_v2)


def CBF():
    m = place['review_count'].quantile(0.6)  # 상위 60% 값
    # print(m)
    C = (place['review_score_sum'] / place['review_count']).mean()  # 평균
    place['weighted_score'] = place.apply(
        lambda x: weighted_score_average(x['review_count'], m,
                                         (x['review_score_sum'] / x['review_count'] if x['review_count'] != 0 else 0),
                                         C),
        axis=1)
    place['score'] = place.apply(
        lambda x: x['review_score_sum'] / x['review_count'] if x['review_count'] != 0 else 0, axis=1)

    selected_category_list = [1]
    filtered_place = place[place['category_id'].isin(selected_category_list)]
    filtered_place = filtered_place.sort_values('weighted_score', ascending=False)
    # print(tabulate(filtered_place[["name", "place_url", "weighted_score", "score", "review_count"]], headers='keys', tablefmt='psql'))


# nrows = 100000 # 일정 수
# ncols = 100000 # 장소 수
# row = np.array([1,3,5,7,9])
# col = np.array([2,4,6,8,10])
# values = np.ones(col.size)
# m = coo_matrix((values, (row,col)), shape=(nrows, ncols), dtype=int)
# print(m)

all_coords = np.array([[0, 2], [1, 4], [2, 6], [0, 0], [1, 0], [2, 0], [0, 5]]) # 일정 id, 장소 id pair
visit_flag = np.ones(len(all_coords), dtype=np.int8)
all_course = coo_matrix((visit_flag, all_coords.T)).toarray()
print(all_course)

visit_place = [0, 2, 5]
coords_y = np.array(visit_place)
coords_x = np.zeros(len(coords_y), dtype=np.int8)
visit_flag = np.ones(len(coords_y), dtype=np.int8)
my_course = coo_matrix((visit_flag, (coords_x, coords_y)), shape=(1, len(all_course[0]))).toarray()
print(my_course)

slice_all_course = all_course[:, visit_place]
slice_my_course = my_course[:, visit_place][0]
print(slice_all_course)
print(slice_my_course)

similarity = []
for course in slice_all_course:
    a = cosine_similarity(course, slice_my_course)
    similarity.append(a)
print(similarity)



