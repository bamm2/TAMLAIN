package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@ApiModel(description = "Flask에서 사용자의 설문 조사를 반영한 추천 장소를 받기 위한 Request")
@Getter
public class ScheduleReloadReq {
    private int surveyId;
    @ApiModelProperty(value = "제주 장소 삭제된 id 리스트")
    private Map<String, List<Integer>> placeDeleteId;

    @ApiModelProperty(value = "제주 장소 id리스트")
    private Map<String, List<Integer>> placeSelectId;

    @Builder
    public ScheduleReloadReq(int surveyId, Map<String, List<Integer>> placeDeleteId, Map<String, List<Integer>> placeSelectId) {
        this.surveyId = surveyId;
        this.placeDeleteId = placeDeleteId;
        this.placeSelectId = placeSelectId;
    }
}

