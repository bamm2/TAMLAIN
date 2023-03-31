package com.ssafy.api.controller;

import com.ssafy.api.request.ScheduleModifyReq;
import com.ssafy.api.response.ScheduleDetailRes;
import com.ssafy.api.response.ScheduleHistoryRes;
import com.ssafy.api.service.HistoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "일정 내역 API", tags = {"History"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/history")
public class HisoryController {
    private final HistoryService historyService;

    @ApiOperation(value = "일정 내역 조회", notes = "마이페이지에서 나의 일정 내역 조회하기")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getScheduleHistory(@PathVariable("userId") int userId) {
        List<ScheduleHistoryRes> scheduleHistoryResList = historyService.getScheduleHistory(userId);
        if(scheduleHistoryResList == null) return ResponseEntity.status(204).body(HttpStatus.NO_CONTENT);
        return ResponseEntity.status(200).body(scheduleHistoryResList);
    }

    @ApiOperation(value = "일정 삭제", notes = "마이페이지에서 나의 일정 삭제하기")
    @PatchMapping("/delete/{scheduleId}")
    public ResponseEntity<?> deleteScheduleHistory(@PathVariable("scheduleId") int scheduleId) {
        historyService.deleteScheduleHistory(scheduleId);
        return ResponseEntity.status(200).body("일정 삭제");
    }

    @ApiOperation(value = "일정명 수정", notes = "일정 내역에서 원하는 일정명 수정하기")
    @PatchMapping("/modify")
    public ResponseEntity<?> modifyScheduleName(@RequestBody ScheduleModifyReq scheduleModifyReq) {
        historyService.modifyScheduleName(scheduleModifyReq);
        return ResponseEntity.status(200).body("일정명 수정");
    }

    @ApiOperation(value = "세부 일정 조회", notes = "세부 일정 내역 조회하기")
    @GetMapping("/scheduleDetail/{scheduleId}")
    public ResponseEntity<?> getScheduleDetail(@PathVariable("scheduleId") int scheduleId) {
        ScheduleDetailRes scheduleDetailRes = historyService.getScheduleDetail(scheduleId);
        return ResponseEntity.status(200).body(scheduleDetailRes);
    }

}
