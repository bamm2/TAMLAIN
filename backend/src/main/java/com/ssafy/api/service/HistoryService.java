package com.ssafy.api.service;

import com.ssafy.api.request.ScheduleModifyReq;
import com.ssafy.api.response.CommonRes;
import com.ssafy.api.response.ScheduleDetailRes;
import com.ssafy.api.response.ScheduleHistoryRes;
import com.ssafy.api.response.SuccessRes;

import java.util.List;

public interface HistoryService {
    SuccessRes<List<ScheduleHistoryRes>> getScheduleHistory(int userId);
    CommonRes deleteScheduleHistory(int scheduleId);
    CommonRes modifyScheduleName(ScheduleModifyReq scheduleModifyReq);
    SuccessRes<ScheduleDetailRes> getScheduleDetail(int scheduleId);
}
