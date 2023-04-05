package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ReviewItem {
    private String jejuPlaceImgUrl;
    private String jejuPlaceName;
    private int score;
    private boolean isVisit;

    @Builder
    public ReviewItem(String jejuPlaceImgUrl, String jejuPlaceName, int score, boolean isVisit) {
        this.jejuPlaceImgUrl = jejuPlaceImgUrl;
        this.jejuPlaceName = jejuPlaceName;
        this.score = score;
        this.isVisit = isVisit;
    }
}
