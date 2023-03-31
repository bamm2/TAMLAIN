package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;

import java.util.LinkedHashMap;
import java.util.List;

@Getter
public class ScheduleDetailRes {
    private MypageCommonInfo mypageCommonInfo;
    private LinkedHashMap<Integer, List<ScheduleDetailItem>> scheduleDetailItemMap;

    @Builder
    public ScheduleDetailRes(MypageCommonInfo mypageCommonInfo, LinkedHashMap<Integer, List<ScheduleDetailItem>> scheduleDetailItemMap) {
        this.mypageCommonInfo = mypageCommonInfo;
        this.scheduleDetailItemMap = scheduleDetailItemMap;
    }
}
