package com.ssafy.api.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
public class ScheduleThumbnailRes {
    private int scheduleThumbnailId;
    private String thumbnailImageUrl;

    @Builder
    public ScheduleThumbnailRes(int scheduleThumbnailId, String thumbnailImageUrl) {
        this.scheduleThumbnailId = scheduleThumbnailId;
        this.thumbnailImageUrl = thumbnailImageUrl;
    }
}
