package com.ssafy.api.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FlaskJejuPlaceItem {
    private int jejuPlaceId;
    private String name;
    private int categoryId;
    private String categoryName;
    private String categoryDetailName;
    private Double latitude;
    private Double longitude;
    private Double reviewScore;

    @Builder
    public FlaskJejuPlaceItem(int jejuPlaceId, String name, int categoryId, String categoryName, String categoryDetailName, Double latitude, Double longitude, Double reviewScore) {
        this.jejuPlaceId = jejuPlaceId;
        this.name = name;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryDetailName = categoryDetailName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.reviewScore = reviewScore;
    }
}
