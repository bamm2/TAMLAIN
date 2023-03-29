import numpy as np
from surprise import Dataset, SVDpp
from surprise.model_selection import cross_validate

def compute_cos_similarity(v1, v2):
    norm1 = np.sqrt(np.sqrt(np.sum(np.square(v1))))
    norm2 = np.sqrt(np.sqrt(np.sum(np.square(v2))))
    dot = np.dot(v1, v2)
    return dot / (norm1 * norm2)


data = Dataset.load_builtin('ml-100k', prompt=False)  # 사용자ID, 상품ID, 평점, 시간
raw_data = np.array(data.raw_ratings, dtype=int)
print(raw_data)

# id 값이 0부터 시작하도록 수정
raw_data[:, 0] -= 1  # 유저
raw_data[:, 1] -= 1  # 영화

n_users = np.max(raw_data[:, 0])  # 유저 수
n_movies = np.max(raw_data[:, 1])  # 영화 수
shape = (n_users + 1, n_movies + 1)
print(shape)  # adj_matrix 크기

adj_matrix = np.ndarray(shape, dtype=int)  # 모든 유저와 모든 유저가 대응하는 matrix 생성
for user_id, movie_id, rating, time in raw_data:
    adj_matrix[user_id][movie_id] = 1.

my_id, my_vector = 0, adj_matrix[0]  # 대상 유저
best_match, best_match_id, best_match_vector = -1, -1, []

for user_id, user_vector in enumerate(adj_matrix):
    if my_id != user_id:
        similarity = compute_cos_similarity(my_vector, user_vector)
        if similarity > best_match:
            best_match = similarity
            best_match_id = user_id
            best_match_vector = user_vector

print('Best Match: {}, Best Match ID: {}'.format(best_match, best_match_id))

recommend_list = []
for i, log in enumerate(zip(my_vector, best_match_vector)):
    log1, log2 = log
    if log1 < 1. and log2 > 0.: # 나는 안보고 상대방은 본 영화
        recommend_list.append(i)
print(recommend_list)

model = SVDpp()
cross_validate(model,data,measures=['rmse','mae'],cv=5,n_jobs=4,verbose=True)
model.predict(my_id)
