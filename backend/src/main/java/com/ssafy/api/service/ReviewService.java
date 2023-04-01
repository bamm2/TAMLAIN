package com.ssafy.api.service;

import com.ssafy.api.request.ReviewRegistReq;
import com.ssafy.api.response.ReviewRes;
import com.ssafy.api.response.ReviewScheduleItemRes;

public interface ReviewService {
    ReviewScheduleItemRes getReviewScheduleHistory(int scheduleId);
    void registReview(ReviewRegistReq reviewRegistReq);
    ReviewRes getReview(int scheduleId);
}
