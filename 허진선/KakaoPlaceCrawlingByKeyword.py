import requests
import pandas as pd
import numpy as np

def elec_location(region,page_num):
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json'
    params = {'query': region,'page': page_num}
    headers = {"Authorization": "KakaoAK 344aa8ae1b69c829e695e47c8a7beb1e"}

    places = requests.get(url, params=params, headers=headers).json()["documents"]
    total = requests.get(url, params=params, headers=headers).json()["meta"]["total_count"]
    if total > 45:
        print(total,'개 중 45개 데이터밖에 가져오지 못했습니다!')
    else :
        print('모든 데이터를 가져왔습니다!')
    return places

def elec_info(places):
    print(places)
    X = []
    Y = []
    stores = []
    road_address = []
    place_url = []
    ID = []
    for place in places:
        X.append(float(place['x']))
        Y.append(float(place['y']))
        stores.append(place['place_name'])
        road_address.append(place['road_address_name'])
        place_url.append(place['place_url'])
        ID.append(place['id'])

    ar = np.array([ID,stores, X, Y, road_address,place_url]).T
    df = pd.DataFrame(ar, columns = ['ID','stores', 'X', 'Y','road_address','place_url'])
    return df

def keywords(location_name):
    df = None
    for loca in location:
        print(elec_location(loca, 1))
        # for page in range(1,4):
        #     local_name = elec_location(loca, page)
            # local_elec_info = elec_info(local_name)
            #
            # if df is None:
            #     df = local_elec_info
            # elif local_elec_info is None:
            #     continue
            # else:
            #     df = pd.concat([df, local_elec_info],join='outer', ignore_index = True)
    return df

if __name__ == "__main__":
    location = ['제주특별자치도']
    df = keywords(location)
    # df = df.drop_duplicates(['ID'])
    # df = df.reset_index()
    # print(df)