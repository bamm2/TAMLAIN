package com.ssafy.api.controller;

import com.ssafy.api.request.ReviewRegistReq;
import com.ssafy.api.response.ReviewRes;
import com.ssafy.api.response.ReviewScheduleItemRes;
import com.ssafy.api.service.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "리뷰(별점) API", tags = {"Review"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;

    @ApiOperation(value = "별점 일정 목록 조회", notes = "별점을 등록할 일정 목록 조회하기")
    @GetMapping("/scheduleItem/{scheduleId}")
    public ResponseEntity<?> getReviewScheduleHistory(@PathVariable("scheduleId") int scheduleId) {
        ReviewScheduleItemRes reviewScheduleItemRes = reviewService.getReviewScheduleHistory(scheduleId);
        if(reviewScheduleItemRes == null) return ResponseEntity.status(204).body("여행 마지막 날짜 이후부터 리뷰 등록 가능");
        return ResponseEntity.status(200).body(reviewScheduleItemRes);
    }

    @ApiOperation(value = "별점 등록", notes = "각 장소마다 별점 등록하기")
    @PostMapping("/regist")
    public ResponseEntity<?> registReview(@RequestBody ReviewRegistReq reviewRegistReq) {
        reviewService.registReview(reviewRegistReq);
        return ResponseEntity.status(201).body("별점 등록 성공");
    }

    @ApiOperation(value = "별점 조회", notes = "내가 등록한 별점 조회하기")
    @GetMapping("/{scheduleId}")
    public ResponseEntity<?> getReview(@PathVariable("scheduleId") int scheduleId) {
        ReviewRes reviewRes = reviewService.getReview(scheduleId);
        if(reviewRes == null) return ResponseEntity.status(204).body(HttpStatus.NO_CONTENT);
        return ResponseEntity.status(200).body(reviewRes);
    }

}
