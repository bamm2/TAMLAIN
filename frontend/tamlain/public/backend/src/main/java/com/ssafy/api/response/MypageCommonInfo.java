package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MypageCommonInfo {
    private String thumbnailImageUrl;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private int period;

    @Builder
    public MypageCommonInfo(String thumbnailImageUrl, String name, LocalDate startDate, LocalDate endDate, int period) {
        this.thumbnailImageUrl = thumbnailImageUrl;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.period = period;
    }
}
