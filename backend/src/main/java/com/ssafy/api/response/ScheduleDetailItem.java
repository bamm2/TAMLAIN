package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ScheduleDetailItem {
    private int scheduleItemId;
    private int day;
    private MapInfo mapInfo;
    private String roadAddress;
    private String placeUrl;
    private String imageUrl;
    private int reviewCount;
    private Double reviewScore;
    private String tag;
    @Builder
    public ScheduleDetailItem(int scheduleItemId, int day, MapInfo mapInfo, String roadAddress, String placeUrl, String imageUrl, int reviewCount, Double reviewScore, String tag) {
        this.scheduleItemId = scheduleItemId;
        this.day = day;
        this.mapInfo = mapInfo;
        this.roadAddress = roadAddress;
        this.placeUrl = placeUrl;
        this.imageUrl = imageUrl;
        this.reviewCount = reviewCount;
        this.reviewScore = reviewScore;
        this.tag = tag;
    }
}
