package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@ApiModel(description = "Flask에서 사용자의 설문 조사 정보를 포함한 Request")
@Getter
public class FlaskSurveyReq {
    @ApiModelProperty(value = "사용자 id")
    private int userId;
    @ApiModelProperty(value = "여행 첫 일자")
    private LocalDate startDate;
    @ApiModelProperty(value = "여행 마지막 일자")
    private LocalDate endDate;
    @ApiModelProperty(value = "여행 테마 id")
    private int travelThemeCode;
    @ApiModelProperty(value = "계절")
    private String season;
    @ApiModelProperty(value = "사용자가 선택한 세부 카테고리 목록")
    private List<Integer> surveyFavorCategoryList;

    @Builder
    public FlaskSurveyReq(int userId, LocalDate startDate, LocalDate endDate, int travelThemeCode, String season, List<Integer> surveyFavorCategoryList) {
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.travelThemeCode = travelThemeCode;
        this.season = season;
        this.surveyFavorCategoryList = surveyFavorCategoryList;
    }
}
