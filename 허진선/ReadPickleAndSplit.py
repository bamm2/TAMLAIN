import pandas as pd
import numpy as np
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from time import sleep


def remove_duplicate_place_code(df):
    df = df.drop_duplicates(['place_code'])
    df = df.reset_index()
    return df


def read_pickle_and_split_category():
    df = pd.read_pickle(f'jeju(1).pkl').drop(columns='index')

    for i in range(2, 10):
        df = pd.concat([df, pd.read_pickle(f'jeju({i}).pkl').drop(columns='index')], ignore_index=True)
    print(f"{len(df)}개 데이터를 읽어옴")

    category_list = [{"name": "문화시설", "code": "CT1"}, {"name": "관광명소", "code": "AT4"},
                     {"name": "음식점", "code": "FD6"}, {"name": "카페", "code": "CE7"}, {"name": "기타", "code": ""}]
    columns_list = ["place_code", "place_name", "category_code", "category_name", "x", "y",
                    "road_address", "place_url"]

    arr_1 = pd.DataFrame(columns=columns_list);
    arr_2 = pd.DataFrame(columns=columns_list);
    arr_3 = pd.DataFrame(columns=columns_list);
    arr_4 = pd.DataFrame(columns=columns_list);
    arr_5 = pd.DataFrame(columns=columns_list);

    for idx, ser in df.iterrows():
        print(idx)
        if ser["category_code"] == category_list[0]["code"]:
            arr_1 = pd.concat([arr_1, ser.to_frame().T], ignore_index=True)
        elif ser["category_code"] == category_list[1]["code"]:
            arr_2 = pd.concat([arr_2, ser.to_frame().T], ignore_index=True)
        elif ser["category_code"] == category_list[2]["code"]:
            arr_3 = pd.concat([arr_3, ser.to_frame().T], ignore_index=True)
        elif ser["category_code"] == category_list[3]["code"]:
            arr_4 = pd.concat([arr_4, ser.to_frame().T], ignore_index=True)
        elif ser["category_code"] == category_list[4]["code"]:
            arr_5 = pd.concat([arr_5, ser.to_frame().T], ignore_index=True)

    arr_1 = remove_duplicate_place_code(arr_1)
    arr_2 = remove_duplicate_place_code(arr_2)
    arr_3 = remove_duplicate_place_code(arr_3)
    arr_4 = remove_duplicate_place_code(arr_4)
    arr_5 = remove_duplicate_place_code(arr_5)

    arr_1.to_pickle('문화시설.pkl')
    arr_2.to_pickle('관광명소.pkl')
    arr_3.to_pickle('음식점.pkl')
    arr_4.to_pickle('카페.pkl')
    arr_5.to_pickle('기타.pkl')

    arr_1.to_excel("문화시설.xlsx")
    arr_2.to_excel("관광명소.xlsx")
    arr_3.to_excel("음식점.xlsx")
    arr_4.to_excel("카페.xlsx")
    arr_5.to_excel("기타.xlsx")

    print(len(arr_1), len(arr_2), len(arr_3), len(arr_4), len(arr_5))


def drop_by_category():
    df = pd.read_pickle(f'기타.pkl').drop(columns='index')
    category_name_list = ["문화,예술 > 미술,공예", "스포츠,레저", "여행 > 관광,명소"]

    for idx, ser in df.iterrows():
        print(idx)
        flag = False
        for i in range(0, len(category_name_list)):
            if category_name_list[i] in ser["category_name"]:
                flag = True
                break
        if flag is False:
            df.drop(idx, inplace=True)

    df.to_pickle('기타(필터링).pkl')
    df.to_excel("기타(필터링).xlsx")


class PlaceInfoScraper:
    def __init__(self):
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        self.driver.implicitly_wait(5)

    def get_place_info(self, address):
        self.driver.get(address)
        sleep(2)

        html = self.driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        location_evaluation = soup.select("div.location_evaluation > a.link_evaluation")
        comment_count = 0
        review_count = 0
        for ele in location_evaluation:
            if ele["data-target"] == "comment":
                comment_count = int(ele["data-cnt"])
            elif ele["data-target"] == "review":
                review_count = int(ele["data-cnt"])
        return comment_count, review_count


if __name__ == "__main__":
    n = 1 # 1~5
    scraper = PlaceInfoScraper()
    category_list = [{"name": "문화시설", "code": "CT1"}, {"name": "관광명소", "code": "AT4"},
                     {"name": "음식점", "code": "FD6"}, {"name": "카페", "code": "CE7"}, {"name": "기타(필터링)", "code": ""}]

    comment_count_list = []
    review_count_list = []
    df = pd.read_pickle(f'{category_list[n-1]["name"]}.pkl').drop(columns='index')
    for idx, ser in df.iterrows():
        url = ser["place_url"]
        comment_count, review_count = scraper.get_place_info(url)
        comment_count_list.append(comment_count)
        review_count_list.append(review_count)
        print(f"{idx+1}/{len(df)} ({comment_count}, {review_count})     {url}")
    df["comment_count"] = comment_count_list
    df["review_count"] = review_count_list

    df.to_pickle(f'{category_list[n-1]["name"]}_new.pkl')
    df.to_excel(f'{category_list[n-1]["name"]}_new.xlsx')