import pandas as pd
from tabulate import tabulate


# 가중 평균 계산
def weighted_score_average(v, m, R, C):
    return ((v / (v + m)) * R) + ((m / (m + v)) * C)


survey = pd.read_pickle('survey.pkl')
place = pd.read_pickle('jeju_place.pkl')
course = pd.read_pickle('course.pkl')  # 장소, 평점

m = place['review_count'].quantile(0.6)  # 상위 60% 값
C = (place['review_score_sum'] / place['review_count']).mean()  # 평균
place['weighted_score'] = place.apply(
    lambda x: weighted_score_average(x['review_count'], m, x['review_score_sum'] / x['review_count'], C), axis=1)

selected_category_list = []
filtered_place = place[place['category_id'].isin(selected_category_list)]
filtered_place = filtered_place.sort_values('weighted_score', ascending=False)

