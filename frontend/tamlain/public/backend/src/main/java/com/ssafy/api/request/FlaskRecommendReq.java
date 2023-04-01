package com.ssafy.api.request;

import com.ssafy.api.response.ReviewItem;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;

@ApiModel(description = "Flask에서 사용자의 설문 조사를 반영한 추천 장소를 받기 위한 Request")
@Getter
public class FlaskRecommendReq {
    private FlaskSurveyReq flaskSurveyReq;
    private List<FlaskJejuPlaceItem> flaskJejuPlaceItemList;
    private HashMap<Integer, List<FlaskJejuPlaceItem>> scheduleItemMap;
    private List<ReviewItem> reviewItem;

//    @Builder
//    public FlaskRecommendReq(FlaskSurveyReq flaskSurveyReq, List<FlaskJejuPlaceItem> flaskJejuPlaceItemList, HashMap<Integer, List<FlaskJejuPlaceItem>> scheduleItemMap) {
//        this.flaskSurveyReq = flaskSurveyReq;
//        this.flaskJejuPlaceItemList = flaskJejuPlaceItemList;
//        this.scheduleItemMap = scheduleItemMap;
//    }

    @Builder
    public FlaskRecommendReq(FlaskSurveyReq flaskSurveyReq, List<FlaskJejuPlaceItem> flaskJejuPlaceItemList, HashMap<Integer, List<FlaskJejuPlaceItem>> scheduleItemMap, List<ReviewItem> reviewItem) {
        this.flaskSurveyReq = flaskSurveyReq;
        this.flaskJejuPlaceItemList = flaskJejuPlaceItemList;
        this.scheduleItemMap = scheduleItemMap;
        this.reviewItem = reviewItem;
    }
}
