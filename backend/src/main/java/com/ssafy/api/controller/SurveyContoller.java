package com.ssafy.api.controller;

import com.ssafy.api.request.SurveyRegistReq;
import com.ssafy.api.response.ReviewScheduleItemRes;
import com.ssafy.api.service.SurveyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "설문 조사 API", tags = {"Survey"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/survey")
public class SurveyContoller {
    private final SurveyService surveyService;
    @ApiOperation(value = "설문 조사 등록", notes = "사용자의 여행 스타일 설문하기")
    @ApiResponses({@ApiResponse(code = 201, message = "성공"), @ApiResponse(code = 202, message = "설문 정보 부족"), @ApiResponse(code = 404, message = "실패")})
    @PostMapping("/regist")
    public ResponseEntity<?> registSurvey(@RequestBody SurveyRegistReq surveyRegistReq) {
        int[] result = surveyService.registSurvey(surveyRegistReq);
        if(result[0] != -1) return ResponseEntity.status(202).body(result[1]);
        else return ResponseEntity.status(201).body(result[1]);
    }
}
