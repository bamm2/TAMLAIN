package com.ssafy.api.service;

import com.ssafy.api.request.SurveyRegistReq;

public interface SurveyService {
    int[] registSurvey(SurveyRegistReq surveyRegistReq);
}
