package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@ApiModel(description = "Flask Request를 위한 리뷰 정보")
@Getter
public class FlaskReviewItem {
    @ApiModelProperty(value = "사용자 id")
    private int userId;
    @ApiModelProperty(value = "계절")
    private String season;
    @ApiModelProperty(value = "여행 테마 코드 id")
    private int travelThemeCode;
    @ApiModelProperty(value = "제주 장소 id")
    private int jejuPlaceId;
    @ApiModelProperty(value = "평점")
    private int score;
    @ApiModelProperty(value = "일정 id")
    private int scheduleId;
    @ApiModelProperty(value = "일차")
    private int day;
    @ApiModelProperty(value = "카테고리 id")
    private int categoryId;

    @Builder
    public FlaskReviewItem(int userId, String season, int travelThemeCode, int jejuPlaceId, int score, int scheduleId, int day, int categoryId) {
        this.userId = userId;
        this.season = season;
        this.travelThemeCode = travelThemeCode;
        this.jejuPlaceId = jejuPlaceId;
        this.score = score;
        this.scheduleId = scheduleId;
        this.day = day;
        this.categoryId = categoryId;
    }
}
