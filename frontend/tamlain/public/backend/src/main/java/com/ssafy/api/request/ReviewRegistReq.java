package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.util.List;

@ApiModel(description = "리뷰(별점) 등록 정보가 포함된 Request")
@Getter
public class ReviewRegistReq {
    @ApiModelProperty(value = "사용자 id")
    private int userId;
    @ApiModelProperty(value = "모든 장소에 대한 리뷰(별점) 목록")
    private List<ReviewRegistItem> reviewRegistItemList;
}
