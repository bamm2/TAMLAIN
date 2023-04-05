package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@ApiModel(description = "Flask에서 사용자의 추천 장소를 받기 위한 Request")
@Getter
public class FlaskRecommendReq {
    @ApiModelProperty(value = "설문 조사 정보")
    private FlaskSurveyItem flaskSurveyItem;
    @ApiModelProperty(value = "제주 장소 목록")
    private List<FlaskJejuPlaceItem> flaskJejuPlaceItemList;
    @ApiModelProperty(value = "리뷰 목록")
    private List<FlaskReviewItem> flaskReviewItemList;
    @ApiModelProperty(value = "사용자가 선택한 일정 목록")
    private List<Integer> flaskSceduleList;

    @Builder
    public FlaskRecommendReq(FlaskSurveyItem flaskSurveyItem, List<FlaskJejuPlaceItem> flaskJejuPlaceItemList, List<FlaskReviewItem> flaskReviewItemList, List<Integer> flaskSceduleList) {
        this.flaskSurveyItem = flaskSurveyItem;
        this.flaskJejuPlaceItemList = flaskJejuPlaceItemList;
        this.flaskReviewItemList = flaskReviewItemList;
        this.flaskSceduleList = flaskSceduleList;
    }
}
