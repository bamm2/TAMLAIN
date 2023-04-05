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
    public SuccessRes<List<ScheduleHistoryRes>> getScheduleHistory(int userId) {
        List<Schedule> scheduleList = scheduleRepository.findAllByUserIdAndIsDeleteFalse(userId);
        List<ScheduleHistoryRes> scheduleHistoryResList = new ArrayList<>();

        for(Schedule schedule : scheduleList) {
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

        return new SuccessRes<>(true, "사용자의 일정 목록을 조회합니다.", scheduleHistoryResList);
    }

    @Override
    public CommonRes deleteScheduleHistory(int scheduleId) {
        Optional<Schedule> oSchedule = scheduleRepository.findById(scheduleId);
        Schedule schedule = oSchedule.orElseThrow(() -> new IllegalArgumentException("schedule doesn't exist"));

        int surveyId = schedule.getSurvey().getId();
        Optional<Survey> oSurvey = surveyRepository.findById(surveyId);
        Survey survey = oSurvey.orElseThrow(() -> new IllegalArgumentException("survey doesn't exist"));

        scheduleRepository.save(Schedule.of(schedule));
        surveyRepository.save(Survey.of(survey));

        return new CommonRes(true, "일정 삭제를 완료했습니다.");
    }

    @Override
    public CommonRes modifyScheduleName(ScheduleModifyReq scheduleModifyReq) {
        if(scheduleModifyReq.getName() == null || scheduleModifyReq.getName().isBlank()) return new CommonRes(false, "일정명을 입력해주세요.");

        Optional<Schedule> oSchedule = scheduleRepository.findById(scheduleModifyReq.getScheduleId());
        Schedule schedule = oSchedule.orElseThrow(() -> new IllegalArgumentException("schedule doesn't exist"));

        scheduleRepository.save(Schedule.of(schedule, scheduleModifyReq.getName()));
        return new CommonRes(true, "일정명 수정을 완료했습니다.");
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
    public SuccessRes<ScheduleDetailRes> getScheduleDetail(int scheduleId) {
        List<ScheduleItem> scheduleItemList = scheduleItemRepository.findAllByScheduleId(scheduleId);

        LinkedHashMap<Integer, List<ScheduleDetailItem>> scheduleDetailItemMap = new LinkedHashMap<>();
        List<ScheduleDetailItem> scheduleDetailItemList = new ArrayList<>();
        int beforeDay = 1;

        for(ScheduleItem scheduleItem : scheduleItemList) {
            JejuPlace jejuPlace = scheduleItem.getJejuPlace();
            int currentDay = scheduleItem.getDay();

            if(beforeDay != currentDay) {
                scheduleDetailItemMap.put(beforeDay, scheduleDetailItemList);
                scheduleDetailItemList = new ArrayList<>();
            }

            MapInfo mapInfo = MapInfo.builder()
                    .jejuPlaceId(jejuPlace.getId())
                    .title(jejuPlace.getName())
                    .latlng(LatLng.builder()
                            .la(jejuPlace.getLatitude())
                            .ma(jejuPlace.getLongitude())
                            .build())
                    .build();

            ScheduleDetailItem scheduleDetailItem = ScheduleDetailItem.builder()
                    .scheduleItemId(scheduleItem.getId())
                    .day(currentDay)
                    .mapInfo(mapInfo)
                    .roadAddress(jejuPlace.getRoadAddress())
                    .placeUrl(jejuPlace.getPlaceUrl())
                    .imageUrl(jejuPlace.getImgUrl())
                    .reviewCount(jejuPlace.getReviewCount())
                    .reviewScore((jejuPlace.getReviewCount() != 0) ? Math.round(((double) jejuPlace.getReviewScoreSum() / jejuPlace.getReviewCount())*10)/10.0 : 0)
                    .tag((jejuPlace.getTag() == null || jejuPlace.getTag().isBlank()) ? "" : "#" + jejuPlace.getTag().replace("_", " #"))
                    .build();

            scheduleDetailItemList.add(scheduleDetailItem);
            beforeDay = currentDay;
        }

        scheduleDetailItemMap.put(beforeDay, scheduleDetailItemList);
        ScheduleDetailRes scheduleDetailRes = ScheduleDetailRes.builder()
                .mypageCommonInfo(getMyPageCommonInfo(scheduleId))
                .scheduleDetailItemMap(scheduleDetailItemMap)
                .build();

        return new SuccessRes<>(true, "상세 정보를 조회합니다.", scheduleDetailRes);
    }
}
