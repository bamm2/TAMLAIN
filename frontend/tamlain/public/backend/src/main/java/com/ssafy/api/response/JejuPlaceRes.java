package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class JejuPlaceRes {
    private int jejuPlaceId;
    private String name;
    private int categoryId;
    private MapInfo mapInfo;
    private String roadAddress;
    private String placeUrl;
    private String imgUrl;
    private Double reviewScore;
    private String tag;

    @Builder
    public JejuPlaceRes(int jejuPlaceId, String name, int categoryId, MapInfo mapInfo, String roadAddress, String placeUrl, String imgUrl, Double reviewScore, String tag) {
        this.jejuPlaceId = jejuPlaceId;
        this.name = name;
        this.categoryId = categoryId;
        this.mapInfo = mapInfo;
        this.roadAddress = roadAddress;
        this.placeUrl = placeUrl;
        this.imgUrl = imgUrl;
        this.reviewScore = reviewScore;
        this.tag = tag;
    }
}
