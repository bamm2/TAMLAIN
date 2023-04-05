package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class ReviewRes {
    private MypageCommonInfo mypageCommonInfo;
    private List<ReviewItem> reviewItemList;

    @Builder
    public ReviewRes(MypageCommonInfo mypageCommonInfo, List<ReviewItem> reviewItemList) {
        this.mypageCommonInfo = mypageCommonInfo;
        this.reviewItemList = reviewItemList;
    }
}
