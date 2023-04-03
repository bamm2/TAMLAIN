package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.util.List;

@ApiModel(description = "등록할 일정 정보가 포함된 Request")
@Getter
public class ScheduleRegistReq {
    @ApiModelProperty(value = "사용자 id")
    private int userId;
    @ApiModelProperty(value = "설문조사 id")
    private int surveyId;
    @ApiModelProperty(value = "일정 썸네일 id")
    private int scheduleThumbnailId;
    @ApiModelProperty(value = "일정명")
    private String name;
    @ApiModelProperty(value = "사용자가 선택한 장소 목록")
    private List<ScheduleRegistItem> scheduleRegistItemList;
}
