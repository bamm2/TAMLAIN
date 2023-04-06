package com.ssafy.api.service;

import com.ssafy.api.request.SurveyRegistReq;
import com.ssafy.api.response.CommonRes;
import com.ssafy.api.response.SuccessRes;

public interface SurveyService {
    SuccessRes<Integer> registSurvey(SurveyRegistReq surveyRegistReq);
    CommonRes deleteSurvey(int surveyId);
}
