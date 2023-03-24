import pandas as pd
from random import *
from lightfm.data import Dataset

age = ["10대", "20대", "30대", "40대"]
thema = ["매운음식투어", "전통음식투어", "건강한음식투어"]
category = ["한식", "양식", "일식", "중식", "양식", "아시아"]

def make_data():
    survey_df = pd.DataFrame(columns=["나이", "테마", "카테고리"])
    place_df = pd.DataFrame(columns=["장소id", "카테고리"])
    course_df = pd.DataFrame(columns=["코스id", "장소id"])

    # 40개 일정 정보 생성
    for s in range (len(age)) :
        for t in range (len(thema)) :
            for c in range (len(category)) :
                survey_df.loc[len(survey_df)] = [s, t, c]
    step = [7, 12, 5, 11]
    for s in range(len(step)):
        for i in range(0, len(survey_df), step[s]):
            survey_df.drop(i, inplace=True)
        survey_df.reset_index(drop=True, inplace=True)

    survey_df["코스id"] = [i for i in range(len(survey_df))]
    survey_df["일정id"] = [i for i in range(len(survey_df))]
    print(survey_df)

    # 20개 장소 생성
    idx = 0
    for i in range(20):
        if idx == 6: idx = 0
        place_df.loc[len(place_df)] = [i, idx]
        idx += 1
    place_df["평점"] = [round(uniform(1, 5), 1) for i in range(len(place_df))]
    print(place_df)

    # 각 일정 코스 생성
    for i in range (len(survey_df)):
        place_list = []
        for j in range (randint(2, 4)): # 방문 장소 2~4개
            place_id = randint(0, len(place_df)-1)
            if place_id in place_list:
                j -= 1
                continue
            place_list.append(place_id)
            course_df.loc[len(course_df)] = [i, place_id]
    print(course_df)

    survey_df.to_pickle('survey.pkl')
    place_df.to_pickle('place.pkl')
    course_df.to_pickle('course.pkl')

    survey_df.to_excel('survey.xlsx')
    place_df.to_excel('place.xlsx')
    course_df.to_excel('course.xlsx')


def recommend():
    survey = pd.read_pickle('survey.pkl')
    place = pd.read_pickle('place.pkl')
    course = pd.read_pickle('course.pkl')

    course_source = [(course.loc[i]['코스id'], course.loc[i]['장소id']) for i in range(len(course))]
    place_meta = place[["장소id", "카테고리", "평점"]]
    place_features_source = [(place_meta['장소id'][i], [place_meta['카테고리'][i]]) for i in range(len(place_meta))]
    print(place_meta[place_meta.columns[1:2]].values.flatten())
    dataset = Dataset()
    dataset.fit(users=course["코스id"].unique(),
                items=place["장소id"].unique(),
                item_features=place_meta[place_meta.columns[1:2]].values.flatten()
                )
    interactions, weights = dataset.build_interactions(course_source)
    item_features = dataset.build_item_features(place_features_source)


    print("interactions")
    print(interactions, end="\n")
    print("weights")
    print(weights, end="\n")
    print("item_features")
    print(item_features, end="\n")


if __name__ == '__main__':
    make_data()
    recommend()