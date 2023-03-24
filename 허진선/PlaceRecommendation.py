import pandas as pd
from random import *

season = ["10대", "20대", "30대", "40대"]
thema = ["매운음식투어", "전통음식투어", "건강한음식투어"]
category = ["한식", "양식", "일식", "중식", "양식", "아시아"]

def make_data():
    survey_df = pd.DataFrame(columns=["나이", "테마", "카테고리"])
    place_df = pd.DataFrame(columns=["장소명", "카테고리"])
    course_df = pd.DataFrame(columns=["id", "방문장소"])

    # 40개 일정 정보 생성
    for s in range (len(season)) :
        for t in range (len(thema)) :
            for c in range (len(category)) :
                survey_df.loc[len(survey_df)] = [s, t, c]
    step = [7, 12, 5, 11]
    for s in range(len(step)):
        for i in range(0, len(survey_df), step[s]):
            survey_df.drop(i, inplace=True)
        survey_df.reset_index(drop=True, inplace=True)

    course_id = []
    for i in range (len(survey_df)):
        course_id.append(i)
    survey_df["코스id"] = course_id
    print(survey_df)

    # 20개 장소 생성
    idx = 0
    for i in range(20):
        if idx == 6: idx = 0
        place_df.loc[len(place_df)] = ["장소"+str(i), idx]
        idx += 1
    print(place_df)

    # 각 일정 코스 생성
    for i in range (len(survey_df)):
        for j in range (randint(2, 4)): # 방문 장소 2~4개
            place_id = randint(0, len(place_df)-1)
            course_df.loc[len(course_df)] = [i, place_id]
    print(course_df)

    survey_df.to_pickle('survey.pkl')
    place_df.to_pickle('place.pkl')
    course_df.to_pickle('course.pkl')

    survey_df.to_excel('survey.xlsx')
    place_df.to_excel('place.xlsx')
    course_df.to_excel('course.xlsx')


if __name__ == '__main__':
    a = 0