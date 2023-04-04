package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@ApiModel(description = "재추천 장소를 받기 위한 정보가 포함된 Request")
@Getter
public class ScheduleReloadReq {
    @ApiModelProperty(value = "설문조사 id")
    private int surveyId;
    @ApiModelProperty(value = "설문조사 id")
    private String userId;
    @ApiModelProperty(value = "제주 장소 삭제된 id 리스트")
    private List<String> placeDeleteId;
    @ApiModelProperty(value = "제주 장소 id 리스트")
    private List<Integer> selectJejuPlaceList;

    @Builder
    public ScheduleReloadReq(int surveyId, String userId, List<String> placeDeleteId, List<Integer> selectJejuPlaceList) {
        this.surveyId = surveyId;
        this.userId = userId;
        this.placeDeleteId = placeDeleteId;
        this.selectJejuPlaceList = selectJejuPlaceList;
    }
}

