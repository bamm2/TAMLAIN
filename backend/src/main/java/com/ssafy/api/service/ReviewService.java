package com.ssafy.api.service;

import com.ssafy.api.request.ReviewRegistReq;
import com.ssafy.api.response.CommonRes;
import com.ssafy.api.response.ReviewRes;
import com.ssafy.api.response.ReviewScheduleItemRes;
import com.ssafy.api.response.SuccessRes;

public interface ReviewService {
    Object getReviewScheduleHistory(int scheduleId);
    CommonRes registReview(ReviewRegistReq reviewRegistReq);
    SuccessRes<ReviewRes> getReview(int scheduleId);
}
