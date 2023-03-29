package com.ssafy.api.response;

import lombok.Builder;
import lombok.Data;

@Data
public class PlaceDetailRes {
    private String placeUrl;
    private Double reviewScore;
    private Double latitude;
    private Double longitude;
    private String jejuPlaceName;
    private String roadAddress;

    @Builder
    public PlaceDetailRes(String placeUrl, Double reviewScore, Double latitude, Double longitude, String jejuPlaceName, String roadAddress) {
        this.placeUrl = placeUrl;
        this.reviewScore = reviewScore;
        this.latitude = latitude;
        this.longitude = longitude;
        this.jejuPlaceName = jejuPlaceName;
        this.roadAddress = roadAddress;
    }
}
