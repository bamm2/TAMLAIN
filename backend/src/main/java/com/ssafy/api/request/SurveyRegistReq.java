package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;

@ApiModel(description = "설문 조사 정보가 포함된 Request")
@Getter
public class SurveyRegistReq {
    @ApiModelProperty(value = "사용자 id")
    private int userId;
    @ApiModelProperty(value = "여행 첫 일자")
    private LocalDate startDate;
    @ApiModelProperty(value = "여행 마지막 일자")
    private LocalDate endDate;
    @ApiModelProperty(value = "여행 테마")
    private String travelTheme;
    @ApiModelProperty(value = "사용자가 선택한 세부 카테고리 목록")
    private LinkedHashMap<Integer, List<String>> surveyFavorCategoryMap;
}
