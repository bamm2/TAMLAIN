package com.ssafy.api.controller;

import com.ssafy.api.request.SurveyRegistReq;
import com.ssafy.api.response.CommonRes;
import com.ssafy.api.response.SuccessRes;
import com.ssafy.api.service.SurveyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(value = "설문 조사 API", tags = {"Survey"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/survey")
public class SurveyContoller {
    private final SurveyService surveyService;
    @ApiOperation(value = "설문 조사 등록", notes = "사용자의 여행 스타일 설문하기")
    @PostMapping("/regist")
    public SuccessRes<Integer> registSurvey(@RequestBody SurveyRegistReq surveyRegistReq) {
        return surveyService.registSurvey(surveyRegistReq);
    }

    @ApiOperation(value = "설문 조사 삭제", notes = "설문 조사를 삭제합니다.")
    @PatchMapping("/delete/{surveyId}")
    public CommonRes deleteSurvey(@PathVariable("surveyId") int surveyId) {
        return surveyService.deleteSurvey(surveyId);
    }
}
