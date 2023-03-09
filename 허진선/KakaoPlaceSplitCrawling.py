import pandas as pd
import numpy as np
import requests
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
    def __init__(self, n):
        # self.start_x = 126.10  # 왼쪽 아래 경도
        # self.start_y = 33.10  # 왼쪽 아래 위도

        self.next_x = 0.01  # 경도 이동 크기
        self.next_y = 0.01  # 위도 이동 크기
        self.num_x = 10  # 경도 총 이동 횟수
        self.num_y = 50  # 위도 총 이동 횟수
        self.start_x = 126.10 + (self.next_x * self.num_x * (n - 1))
        self.start_y = 33.10
        self.research_size = 10

    def search_places_in_range(self, start_x, start_y, end_x, end_y, step=1):
        if step > 5:
            return []
        page_num = 1
        all_data_list = []  # 장소 리스트
        while 1:
            url = 'https://dapi.kakao.com/v2/local/search/keyword.json'
            params = {'query': '제주특별자치도', 'page': page_num ,
                      'rect': f'{start_x},{start_y},{end_x},{end_y}'}
            headers = {"Authorization": "KakaoAK 27108d6e6d264aa1ede95e799b97a8c3"}
            resp = requests.get(url, params=params, headers=headers)
            search_count = resp.json()["meta"]["total_count"]

            if search_count > 45: # 카카오맵의 검색 결과는 최대 45개만 제공되므로 45개가 넘는 경우 범위를 100개 구역으로 나누어 재검색
                print(f"({search_count} =", end=" ")
                resize = 1 / self.research_size ** step
                next_x = self.next_x * resize
                next_y = self.next_y * resize
                for i in range(0, self.research_size):
                    end_x = start_x + next_x
                    initial_start_y = start_y
                    for j in range(0, self.research_size):
                        end_y = initial_start_y + next_y
                        each_data = self.search_places_in_range(start_x, initial_start_y, end_x, end_y, step + 1)
                        all_data_list.extend(each_data)
                        initial_start_y = end_y
                    start_x = end_x
                print(f"{len(all_data_list)})", end=" ")
                return all_data_list

            else:
                if resp.json()["meta"]["is_end"]:
                    all_data_list.extend(resp.json()["documents"])
                    return all_data_list
                else:
                    page_num += 1
                    all_data_list.extend(resp.json()["documents"])

    def get_place_list(self):
        overlapped_result = []  # 장소 리스트
        for i in range(1, self.num_x + 1):  # 지도를 사각형으로 나누면서 데이터 받아옴
            end_x = self.start_x + self.next_x
            initial_start_y = self.start_y
            for j in range(1, self.num_y + 1):
                end_y = initial_start_y + self.next_y
                each_result = self.search_places_in_range(self.start_x, initial_start_y, end_x,
                                                          end_y)
                overlapped_result.extend(each_result)
                initial_start_y = end_y
                print(f"\n        {j} / {self.num_y} + {len(each_result)}")
            self.start_x = end_x
            print(f"{i} / {self.num_x} (누적 {len(overlapped_result)}개)")  # 진행률 출력

        x = []
        y = []
        place_code = []
        place_name = []
        road_address = []
        place_url = []
        category_code = []
        category_name = []
        for place in overlapped_result:
            x.append(float(place["x"]))
            y.append(float(place["y"]))
            place_name.append(place["place_name"])
            road_address.append(place["road_address_name"])
            place_url.append(place["place_url"])
            place_code.append(place['id'])
            category_code.append(place["category_group_code"])
            category_name.append(place["category_name"])

        ar = np.array([place_code, place_name, category_code, category_name, x, y, road_address, place_url]).T
        df = pd.DataFrame(ar, columns=["place_code", "place_name", "category_code", "category_name", "x", "y",
                                       "road_address", "place_url"]);
        df = df.drop_duplicates(['place_code'])
        df = df.reset_index()
        return df


if __name__ == "__main__":
    # for n in range(1, 10):
    #     listScraper = PlaceListScraper(n)
    #     print(listScraper.start_x, listScraper.start_y)
    n = 1 # 1~9 값으로 설정
    listScraper = PlaceListScraper(n)
    place_df = listScraper.get_place_list()
    filename = f"전체({n}).xlsx"
    place_df.to_excel(filename, sheet_name='COUNTRIES')
    place_df.to_pickle(f'jeju({n}).pkl')

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
