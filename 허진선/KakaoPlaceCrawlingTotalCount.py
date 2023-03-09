import requests

start_x, start_y, end_x, end_y = 126.10, 33.10, 127.00, 33.60
category_list = [{"name": "문화시설", "code": "CT1"}, {"name": "관광명소", "code": "AT4"},
                 {"name": "음식점", "code": "FD6"}, {"name": "카페", "code": "CE7"}]


def search_by_keyword(keyword):
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json'
    params = {'query': keyword, 'page': 1,
              'rect': f'{start_x},{start_y},{end_x},{end_y}'}
    headers = {"Authorization": "KakaoAK 344aa8ae1b69c829e695e47c8a7beb1e"}

    places = requests.get(url, params=params, headers=headers).json()["documents"]
    total = requests.get(url, params=params, headers=headers).json()["meta"]["total_count"]

    return total


def search_by_category(category_index):
    url = 'https://dapi.kakao.com/v2/local/search/category.json'
    params = {'category_group_code': category_list[category_index]["code"], 'page': 1,
              'rect': f'{start_x},{start_y},{end_x},{end_y}'}
    headers = {"Authorization": "KakaoAK 344aa8ae1b69c829e695e47c8a7beb1e"}

    places = requests.get(url, params=params, headers=headers).json()["documents"]
    total = requests.get(url, params=params, headers=headers).json()["meta"]["total_count"]

    return total


if __name__ == "__main__":
    keyword = "제주특별자치도"
    count = search_by_keyword(keyword)

    # category_index = 0
    # count = search_by_category(category_index)

    print(f"총 {count}개의 검색결과")
