package com.ssafy.api.service;

import com.ssafy.api.request.ScheduleModifyReq;
import com.ssafy.api.response.*;
import com.ssafy.db.entity.JejuPlace;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.ScheduleItem;
import com.ssafy.db.entity.Survey;
import com.ssafy.db.repository.ScheduleItemRepository;
import com.ssafy.db.repository.ScheduleRepository;
import com.ssafy.db.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

@Service("historyService")
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {
    private final ScheduleRepository scheduleRepository;
    private final ScheduleItemRepository scheduleItemRepository;
    private final SurveyRepository surveyRepository;
    @Override
    public List<ScheduleHistoryRes> getScheduleHistory(int userId) {
        Optional<List<Schedule>> oScheduleList = scheduleRepository.findAllByUserIdAndIsDeleteFalse(userId);
        List<ScheduleHistoryRes> scheduleHistoryResList = new ArrayList<>();

        if(!oScheduleList.isPresent()) return null;

        for(Schedule schedule : oScheduleList.get()) {
            ScheduleHistoryRes scheduleHistoryRes = ScheduleHistoryRes.builder()
                    .scheduleId(schedule.getId())
                    .thumbnailImageUrl(schedule.getScheduleThumbnail().getThumbnailImageUrl())
                    .nickName(schedule.getUser().getUserProfile().getNickName())
                    .name(schedule.getName())
                    .startDate(schedule.getSurvey().getStartDate())
                    .endDate(schedule.getSurvey().getEndDate())
                    .period(schedule.getPeriod())
                    .isReview(schedule.isReview())
                    .build();

            scheduleHistoryResList.add(scheduleHistoryRes);
        }

        return scheduleHistoryResList;
    }

    @Override
    public void deleteScheduleHistory(int scheduleId) {
        Optional<Schedule> oSchedule = scheduleRepository.findById(scheduleId);
        Schedule schedule = oSchedule.orElseThrow(() -> new IllegalArgumentException("schedule doesn't exist"));

        int surveyId = schedule.getSurvey().getId();
        Optional<Survey> oSurvey = surveyRepository.findById(surveyId);
        Survey survey = oSurvey.orElseThrow(() -> new IllegalArgumentException("survey doesn't exist"));

        scheduleRepository.save(Schedule.of(schedule));
        surveyRepository.save(Survey.of(survey));
    }

    @Override
    public void modifyScheduleName(ScheduleModifyReq scheduleModifyReq) {
        Optional<Schedule> oSchedule = scheduleRepository.findById(scheduleModifyReq.getScheduleId());
        Schedule schedule = oSchedule.orElseThrow(() -> new IllegalArgumentException("schedule doesn't exist"));

        scheduleRepository.save(Schedule.of(schedule, scheduleModifyReq.getName()));
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
    public ScheduleDetailRes getScheduleDetail(int scheduleId) {
        Optional<List<ScheduleItem>> oScheduleItemList = scheduleItemRepository.findAllByScheduleId(scheduleId);
        List<ScheduleItem> scheduleItemList = oScheduleItemList.orElseThrow(() -> new IllegalArgumentException("scheduleItem doesn't exist"));

        LinkedHashMap<Integer, List<ScheduleDetailItem>> scheduleDetailItemMap = new LinkedHashMap<>();
        List<ScheduleDetailItem> scheduleDetailItemList = new ArrayList<>();
        int beforeDay = 1;

        for(ScheduleItem scheduleItem : scheduleItemList) {
            JejuPlace jejuPlace = scheduleItem.getJejuPlace();
            int currentDay = scheduleItem.getDay();
            Double reviewScore = ((double)jejuPlace.getReviewScoreSum() / jejuPlace.getReviewCount());

            if(beforeDay != currentDay) {
                scheduleDetailItemMap.put(beforeDay, scheduleDetailItemList);
                scheduleDetailItemList = new ArrayList<>();
            }

            MapInfo mapInfo = MapInfo.builder()
                    .title(jejuPlace.getName())
                    .latlng(LatLng.builder()
                            .la(jejuPlace.getLatitude())
                            .ma(jejuPlace.getLongitude())
                            .build())
                    .build();

            ScheduleDetailItem scheduleDetailItem = ScheduleDetailItem.builder()
                    .scheduleItemId(scheduleItem.getId())
                    .day(currentDay)
                    .jejuPlaceId(jejuPlace.getId())
                    .mapInfo(mapInfo)
                    .roadAddress(jejuPlace.getRoadAddress())
                    .placeUrl(jejuPlace.getPlaceUrl())
                    .imageUrl(jejuPlace.getImgUrl())
                    .reviewCount(jejuPlace.getReviewCount())
                    .reviewScore(Math.round(reviewScore*10)/10.0)
                    .tag(jejuPlace.getTag())
                    .build();

            scheduleDetailItemList.add(scheduleDetailItem);
            beforeDay = currentDay;
        }

        scheduleDetailItemMap.put(beforeDay, scheduleDetailItemList);
        ScheduleDetailRes scheduleDetailRes = ScheduleDetailRes.builder()
                .mypageCommonInfo(getMyPageCommonInfo(scheduleId))
                .scheduleDetailItemMap(scheduleDetailItemMap)
                .build();
        return scheduleDetailRes;
    }
}
