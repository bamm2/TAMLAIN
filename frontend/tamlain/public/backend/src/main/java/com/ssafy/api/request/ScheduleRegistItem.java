package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel(description = "일차마다 선택한 장소에 대한 정보")
@Getter
public class ScheduleRegistItem {
    @ApiModelProperty(value = "제주 장소 id")
    private int jejuPlaceId;
    @ApiModelProperty(value = "일차")
    private int day;
}
