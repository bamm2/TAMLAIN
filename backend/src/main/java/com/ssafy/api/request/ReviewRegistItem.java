package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel(description = "하나의 장소에 대한 리뷰(별점) 정보")
@Getter
public class ReviewRegistItem {
    @ApiModelProperty(value = "일정 목록 id")
    private int scheduleItemId;
    @ApiModelProperty(value = "제주 장소 id")
    private int jejuPlaceId;
    @ApiModelProperty(value = "별점 점수")
    private int score;
}
