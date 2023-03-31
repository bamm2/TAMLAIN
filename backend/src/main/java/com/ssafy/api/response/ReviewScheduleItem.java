package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ReviewScheduleItem {
    private String jejuPlaceImgUrl;
    private String jejuPlaceName;
    private int scheduleItemId;
    private int jejuPlaceId;

    @Builder
    public ReviewScheduleItem(String jejuPlaceImgUrl, String jejuPlaceName, int scheduleItemId, int jejuPlaceId) {
        this.jejuPlaceImgUrl = jejuPlaceImgUrl;
        this.jejuPlaceName = jejuPlaceName;
        this.scheduleItemId = scheduleItemId;
        this.jejuPlaceId = jejuPlaceId;
    }
}
