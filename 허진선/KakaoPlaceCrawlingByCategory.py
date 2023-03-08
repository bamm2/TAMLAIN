import pandas as pd
import numpy as np
import requests
from collections import OrderedDict
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from time import sleep


class PlaceInfoScraper:
    def __init__(self):
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        self.driver.implicitly_wait(5)

    def get_place_info(self, address):  # 각 장소별 리뷰 데이터를 크롤링
        self.driver.get(address)
        sleep(2)

        # 장소 이미지 찾기
        html = self.driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        place_info = soup.select_one("div.cont_essential")
        review_count = place_info.select_one("a.link_evaluation > span.color_g")
        if review_count is not None:
            review_count = int(review_count.text[1:-5])
        img_url = place_info.select_one("a.link_present > span.bg_present")
        if img_url is not None:
            img_url = img_url["style"][24:-2]

        # 리뷰 찾기
        while review_count is not None and review_count > 3:  # 후기 더보기 버튼 끝까지 클릭
            button = self.driver.find_element(By.CLASS_NAME, 'link_more')
            sleep(0.5)
            btn_text = button.text

            if btn_text == "메뉴 더보기" or btn_text == "코스 더보기":
                button = self.driver.find_elements(By.CLASS_NAME, 'link_more')
                sleep(0.5)
                btn_text = button[1].text
                button = button[1]

            if btn_text == "후기 접기":
                break
            button.click()

        html = self.driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        reviews = soup.select("ul.list_evaluation > li")
        written_at = []
        star_rate = []

        for review in reviews:
            time_write = review.select_one("div.unit_info > span.time_write").text
            rating_per = review.select_one("div.star_info > div > span > span")["style"][6:-2]
            user_rating = int(int(rating_per) / 20)  # 유저별 별점
            written_at.append(time_write)
            star_rate.append(user_rating)

        ar = np.array([star_rate, written_at]).T
        df = pd.DataFrame(ar, columns=["star_rate", "written_at"]);
        return img_url, df


class PlaceListScraper:
    def __init__(self):
        self.category_list = [{"name": "문화시설", "code": "CT1"}, {"name": "관광명소", "code": "AT4"},
                              {"name": "음식점", "code": "FD6"}, {"name": "카페", "code": "CE7"}]
        self.start_x = 126.10  # 왼쪽 아래 경도
        self.start_y = 33.10  # 왼쪽 아래 위도
        self.next_x = 0.1  # 경도 이동 크기
        self.next_y = 0.1  # 위도 이동 크기
        self.num_x = 9  # 경도 총 이동 횟수
        self.num_y = 5  # 위도 총 이동 횟수

    def search_places_in_range(self, code, start_x, start_y, end_x, end_y):
        page_num = 1
        all_data_list = []  # 장소 리스트
        while 1:
            url = 'https://dapi.kakao.com/v2/local/search/category.json'
            params = {'category_group_code': " ", 'page': page_num,
                      'rect': f'{start_x},{start_y},{end_x},{end_y}'}
            headers = {"Authorization": "KakaoAK 344aa8ae1b69c829e695e47c8a7beb1e"}
            resp = requests.get(url, params=params, headers=headers)
            search_count = resp.json()["meta"]["total_count"]

            # 카카오맵의 검색 결과는 최대 45개만 제공되므로 45개가 넘는 경우 범위를 나누어 재검색
            if search_count > 45:
                dividing_x = (start_x + end_x) / 2
                dividing_y = (start_y + end_y) / 2
                all_data_list.extend(
                    self.search_places_in_range(code, start_x, start_y, dividing_x, dividing_y))  # 4등분 중 왼쪽 아래
                all_data_list.extend(
                    self.search_places_in_range(code, dividing_x, start_y, end_x, dividing_y))  # 4등분 중 오른쪽 아래
                all_data_list.extend(
                    self.search_places_in_range(code, start_x, dividing_y, dividing_x, end_y))  # 4등분 중 왼쪽 위
                all_data_list.extend(
                    self.search_places_in_range(code, dividing_x, dividing_y, end_x, end_y))  # 4등분 중 오른쪽 위
                return all_data_list

            else:
                if resp.json()["meta"]["is_end"]:
                    all_data_list.extend(resp.json()["documents"])
                    return all_data_list
                else:
                    page_num += 1
                    all_data_list.extend(resp.json()["documents"])

    def get_place_list(self, category_idx):
        code = self.category_list[category_idx]["code"]
        overlapped_result = []  # 장소 리스트
        for i in range(1, self.num_x + 1):  # 지도를 사각형으로 나누면서 데이터 받아옴
            end_x = self.start_x + self.next_x
            initial_start_y = self.start_y
            for j in range(1, self.num_y + 1):
                end_y = initial_start_y + self.next_y
                each_result = self.search_places_in_range(code, self.start_x, initial_start_y, end_x,
                                                          end_y)
                overlapped_result.extend(each_result)
                print(each_result)
                initial_start_y = end_y
            self.start_x = end_x

        place_list = list(
            map(dict, OrderedDict.fromkeys(tuple(sorted(d.items())) for d in overlapped_result)))  # 중복값 제거

        x = []
        y = []
        place_name = []
        road_address = []
        place_url = []
        category_name = []
        for place in place_list:
            x.append(float(place["x"]))
            y.append(float(place["y"]))
            place_name.append(place["place_name"])
            road_address.append(place["road_address_name"])
            place_url.append(place["place_url"])
            category_name.append(place["category_name"])

        ar = np.array([place_name, category_name, x, y, road_address, place_url]).T
        df = pd.DataFrame(ar, columns=["place_name", "category", "x", "y", "road_address", "place_url"]);
        return df


if __name__ == "__main__":
    listScraper = PlaceListScraper()
    category_idx = 1
    category_name = listScraper.category_list[category_idx]["name"]
    place_df = listScraper.get_place_list(category_idx)
    filename = "%s.xlsx" % category_name
    place_df.to_excel(filename, sheet_name='COUNTRIES')

    # infoScraper = PlaceInfoScraper()
    # img_url = []
    # review_df = pd.DataFrame(columns=["place_id", "star_rate", "written_at"])
    # for idx, ser in place_df.iterrows():
    #     print(ser["place_url"])
    #     info = infoScraper.get_place_info(ser["place_url"])
    #     img_url.append(info[0])
    #     info[1]["place_id"] = idx
    #     review_df = pd.concat([review_df, info[1]], ignore_index=True)
    # place_df = place_df.assign(img_url=img_url)
    #
    # print(place_df.to_string(header=False))
    # print(review_df.to_string(header=False))
