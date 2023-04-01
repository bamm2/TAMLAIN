package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel(description = "일정명 수정 정보가 포함된 Request")
@Getter
public class ScheduleModifyReq {
    @ApiModelProperty(value = "일정 id")
    private int scheduleId;
    @ApiModelProperty(value = "변경할 일정명")
    private String name;
}
