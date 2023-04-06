package com.ssafy.api.response;

import lombok.Builder;
import lombok.Data;

@Data
public class PlaceDetailRes {
    private String placeUrl;
    private Double reviewScore;
    private MapInfo mapInfo;
    private String roadAddress;

    @Builder
    public PlaceDetailRes(String placeUrl, Double reviewScore, MapInfo mapInfo, String roadAddress) {
        this.placeUrl = placeUrl;
        this.reviewScore = reviewScore;
        this.mapInfo = mapInfo;
        this.roadAddress = roadAddress;
    }
}
