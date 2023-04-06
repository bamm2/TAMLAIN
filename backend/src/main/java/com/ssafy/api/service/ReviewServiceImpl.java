package com.ssafy.api.service;

import com.ssafy.api.request.ReviewRegistItem;
import com.ssafy.api.request.ReviewRegistReq;
import com.ssafy.api.response.*;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("reviewService")
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ScheduleRepository scheduleRepository;
    private final ScheduleItemRepository scheduleItemRepository;
    private final UserRepository userRepository;
    private final JejuPlaceRepository jejuPlaceRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public Object getReviewScheduleHistory(int scheduleId) {
        Optional<Schedule> oSchedule = scheduleRepository.findById(scheduleId);
        Schedule schedule = oSchedule.orElseThrow(() -> new IllegalArgumentException("schedule doesn't exist"));

        if(LocalDate.now().isBefore(schedule.getSurvey().getEndDate())) return new CommonRes(false, "여행 마지막 날짜 이후부터 리뷰 등록이 가능합니다.");

        List<ScheduleItem> scheduleItemList = scheduleItemRepository.findAllByScheduleId(scheduleId);

        List<ReviewScheduleItem> reviewScheduleItemList = new ArrayList<>();
        List<String> scheduleNameList = new ArrayList<>();

        for(ScheduleItem scheduleItem : scheduleItemList) {
            int scheduleItemId = scheduleItem.getId();
            JejuPlace jejuPlace = scheduleItem.getJejuPlace();

            if(scheduleNameList.contains(jejuPlace.getName())) continue;

            ReviewScheduleItem reviewScheduleItem = ReviewScheduleItem.builder()
                    .jejuPlaceImgUrl(jejuPlace.getImgUrl())
                    .jejuPlaceName(jejuPlace.getName())
                    .scheduleItemId(scheduleItemId)
                    .jejuPlaceId(jejuPlace.getId())
                    .build();

            reviewScheduleItemList.add(reviewScheduleItem);
            scheduleNameList.add(jejuPlace.getName());
        }

        ReviewScheduleItemRes reviewScheduleItemRes = ReviewScheduleItemRes.builder()
                .mypageCommonInfo(getMyPageCommonInfo(scheduleId))
                .reviewScheduleItemList(reviewScheduleItemList)
                .build();

        return new SuccessRes<>(true, "리뷰 작성을 위해 해당 일정 목록을 조회합니다.", reviewScheduleItemRes);
    }

    public MypageCommonInfo getMyPageCommonInfo(int scheduleId) {
        Optional<Schedule> oSchedule = scheduleRepository.findById(scheduleId);
        Schedule schedule = oSchedule.orElseThrow(() -> new IllegalArgumentException("schedule doesn't exist"));

        MypageCommonInfo mypageCommonInfo = MypageCommonInfo.builder()
                .thumbnailImageUrl(schedule.getScheduleThumbnail().getThumbnailImageUrl())
                .name(schedule.getName())
                .startDate(schedule.getSurvey().getStartDate())
                .endDate(schedule.getSurvey().getEndDate())
                .period(schedule.getPeriod())
                .build();

        return  mypageCommonInfo;
    }

    @Override
    public CommonRes registReview(ReviewRegistReq reviewRegistReq) {
        Optional<User> oUser = userRepository.findById(reviewRegistReq.getUserId());
        User user = oUser.orElseThrow(() -> new IllegalArgumentException("user doesn't exist"));

        for(ReviewRegistItem reviewRegistItem : reviewRegistReq.getReviewRegistItemList()) {
            Optional<ScheduleItem> oScheduleItem = scheduleItemRepository.findById(reviewRegistItem.getScheduleItemId());
            ScheduleItem scheduleItem = oScheduleItem.orElseThrow(() -> new IllegalArgumentException("scheduleItem doesn't exist"));

            Optional<JejuPlace> oJejuPlace = jejuPlaceRepository.findById(reviewRegistItem.getJejuPlaceId());
            JejuPlace jejuPlace = oJejuPlace.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));

            Review review = Review.builder()
                    .user(user)
                    .scheduleItem(scheduleItem)
                    .jejuPlace(jejuPlace)
                    .score(reviewRegistItem.getScore())
                    .build();

            reviewRepository.save(review);

            JejuPlace newJejuPlace = JejuPlace.of(jejuPlace,
                    jejuPlace.getReviewScoreSum()+reviewRegistItem.getScore(),
                    jejuPlace.getReviewCount()+1);

            jejuPlaceRepository.save(newJejuPlace);

            scheduleRepository.save(Schedule.of(scheduleItem.getSchedule(), scheduleItem.getSchedule().isDelete(), true));
        }

        return new CommonRes(true, "리뷰 등록을 완료했습니다.");
    }

    @Override
    public SuccessRes<ReviewRes> getReview(int scheduleId) {
        List<ScheduleItem> scheduleItemList = scheduleItemRepository.findAllByScheduleId(scheduleId);

        List<ReviewItem> reviewItemList = new ArrayList<>();
        for(ScheduleItem scheduleItem : scheduleItemList) {
            boolean flag = false;

            for(ReviewItem reviewItem : reviewItemList) {
                if(reviewItem.getJejuPlaceName().equals(scheduleItem.getJejuPlace().getName())) {
                    flag = true;
                    break;
                }
            }

            if(flag) continue;

            int score = 0;
            boolean visited = false;

            Optional<Review> oReview = reviewRepository.findByScheduleItemId(scheduleItem.getId());
            if(oReview.isPresent()) {
                score = oReview.get().getScore();
                visited = true;
            }

            ReviewItem reviewItem = ReviewItem.builder()
                    .jejuPlaceImgUrl(scheduleItem.getJejuPlace().getImgUrl())
                    .jejuPlaceName(scheduleItem.getJejuPlace().getName())
                    .score(score)
                    .isVisit(visited)
                    .build();

            reviewItemList.add(reviewItem);
        }

        ReviewRes reviewRes = ReviewRes.builder()
                .mypageCommonInfo(getMyPageCommonInfo(scheduleId))
                .reviewItemList(reviewItemList)
                .build();

        return new SuccessRes<>(true, "리뷰를 조회합니다.", reviewRes);
    }

}
