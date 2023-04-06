package com.ssafy.api.response;

import lombok.Data;

import java.util.LinkedHashMap;

@Data
public class SearchPlaceRes {
    private int searchId;
    private String imgUrl;
    private String title;
    private String roadAddress;
    private int jejuPlaceId;
    private LinkedHashMap<String, Double> latlng;

    public SearchPlaceRes(int searchId, String imgUrl, String title, String roadAddress, int jejuPlaceId, LinkedHashMap<String, Double> latlng) {
        this.searchId = searchId;
        this.imgUrl = imgUrl;
        this.title = title;
        this.roadAddress = roadAddress;
        this.jejuPlaceId = jejuPlaceId;
        this.latlng = latlng;
    }
}