package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@ApiModel(description = "Flask Request를 위한 제주 장소 정보")
@Getter
public class FlaskJejuPlaceItem {
    @ApiModelProperty(value = "제주 장소 id")
    private int jejuPlaceId;
    @ApiModelProperty(value = "카테고리 id")
    private int categoryId;
    @ApiModelProperty(value = "카테고리명")
    private String categoryName;
    @ApiModelProperty(value = "평점 총합")
    private int reviewScoreSum;
    @ApiModelProperty(value = "평점 수")
    private int reviewCount;

    @Builder
    public FlaskJejuPlaceItem(int jejuPlaceId, int categoryId, String categoryName, int reviewScoreSum, int reviewCount) {
        this.jejuPlaceId = jejuPlaceId;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.reviewScoreSum = reviewScoreSum;
        this.reviewCount = reviewCount;
    }
}
