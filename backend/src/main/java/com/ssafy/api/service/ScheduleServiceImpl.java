package com.ssafy.api.service;

import com.ssafy.api.request.*;
import com.ssafy.api.response.*;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import kong.unirest.GenericType;
import kong.unirest.HttpResponse;
import kong.unirest.Unirest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Period;
import java.util.*;


@Service("scheduleService")
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {
    private final UserRepository userRepository;
    private final ScheduleThumbnailRepository scheduleThumbnailRepository;
    private final ScheduleRepository scheduleRepository;
    private final ScheduleItemRepository scheduleItemRepository;
    private final SurveyRepository surveyRepository;
    private final SurveyFavorCategoryRepository surveyFavorCategoryRepository;
    private final JejuPlaceRepository jejuPlaceRepository;
    private final ReviewRepository reviewRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final String REDIS_KEY_PREFIX = "DELETE_PLACE:";

    @Override
    public SuccessRes<List<SearchPlaceRes>> getsearchPlace(String keyword) {
        List<JejuPlace> jejuPlaceList = jejuPlaceRepository.findByNameContaining(keyword);
        List<SearchPlaceRes> serachPlaceResList = new ArrayList<>();

        for(JejuPlace jejuPlace : jejuPlaceList) {
            LinkedHashMap<String, Double> map = new LinkedHashMap<>();
            map.put("La", jejuPlace.getLatitude());
            map.put("Ma", jejuPlace.getLongitude());

            SearchPlaceRes serachPlaceRes = new SearchPlaceRes(
                    serachPlaceResList.size()+1,
                    jejuPlace.getImgUrl(),
                    jejuPlace.getName(),
                    jejuPlace.getRoadAddress(),
                    jejuPlace.getId(),
                    map);
            serachPlaceResList.add(serachPlaceRes);
        }

        return new SuccessRes<List<SearchPlaceRes>>(true, "해당 검색어에 포함된 장소들을 조회합니다.", serachPlaceResList);
    }

    @Override
    public SuccessRes<List<JejuPlaceRes>> getAllPlace() {
        List<JejuPlace> jejuPlaceList = jejuPlaceRepository.findAll();
        List<JejuPlaceRes> jejuPlaceResList = new ArrayList<>();

        for(JejuPlace jejuPlace : jejuPlaceList) {
            JejuPlaceRes jejuPlaceRes = JejuPlaceRes.builder()
                    .name(jejuPlace.getName())
                    .categoryId(jejuPlace.getCategory().getId())
                    .mapInfo(MapInfo.builder()
                            .jejuPlaceId(jejuPlace.getId())
                            .title(jejuPlace.getName())
                            .latlng(LatLng.builder().la(jejuPlace.getLatitude()).ma(jejuPlace.getLongitude()).build())
                            .build())
                    .roadAddress(jejuPlace.getRoadAddress())
                    .placeUrl(jejuPlace.getPlaceUrl())
                    .imgUrl(jejuPlace.getImgUrl())
                    .reviewScore((jejuPlace.getReviewCount() != 0) ? Math.round(((double) jejuPlace.getReviewScoreSum() / jejuPlace.getReviewCount())*10)/10.0 : 0)
                    .tag((jejuPlace.getTag() == null || jejuPlace.getTag().isBlank()) ? "" : "#" + jejuPlace.getTag().replace("_", " #"))
                    .build();

            jejuPlaceResList.add(jejuPlaceRes);
        }

        return new SuccessRes<List<JejuPlaceRes>>(true, "검색을 위한 전체 장소를 조회합니다.", jejuPlaceResList);
    }

    @Override
    public SuccessRes<PlaceDetailRes> getPlaceDetail(int jejuPlaceId) {
        Optional<JejuPlace> oJejuPlaces = jejuPlaceRepository.findById(jejuPlaceId);
        JejuPlace jejuPlace = oJejuPlaces.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));

        PlaceDetailRes placeDetailRes = PlaceDetailRes.builder()
                .placeUrl(jejuPlace.getPlaceUrl())
                .reviewScore((jejuPlace.getReviewCount() != 0) ? Math.round(((double) jejuPlace.getReviewScoreSum() / jejuPlace.getReviewCount())*10)/10.0 : 0)
                .mapInfo(MapInfo.builder()
                        .jejuPlaceId(jejuPlace.getId())
                        .title(jejuPlace.getName())
                        .latlng(LatLng.builder().la(jejuPlace.getLatitude()).ma(jejuPlace.getLongitude()).build())
                        .build())
                .roadAddress(jejuPlace.getRoadAddress())
                .build();

        return new SuccessRes<PlaceDetailRes>(true, "상세 정보를 조회합니다.", placeDetailRes);
    }



    @Override
    public SuccessRes<List<ScheduleThumbnailRes>> getScheduleThumbnail() {
        List<ScheduleThumbnail> scheduleThumbnailList = scheduleThumbnailRepository.findAll();
        List<ScheduleThumbnailRes> scheduleThumbnailResList = new ArrayList<>();

        for(ScheduleThumbnail scheduleThumbnail : scheduleThumbnailList) {
            ScheduleThumbnailRes scheduleThumbnailRes = ScheduleThumbnailRes.builder()
                    .scheduleThumbnailId(scheduleThumbnail.getId())
                    .thumbnailImageUrl(scheduleThumbnail.getThumbnailImageUrl())
                    .build();
            scheduleThumbnailResList.add(scheduleThumbnailRes);
        }

        return new SuccessRes<List<ScheduleThumbnailRes>>(true, "일정 썸네일 이미지를 조회합니다.", scheduleThumbnailResList);
    }

    @Override
    public CommonRes registSchedule(ScheduleRegistReq scheduleRegistReq) {
        Optional<User> oUser = userRepository.findById(scheduleRegistReq.getUserId());
        User user = oUser.orElseThrow(() -> new IllegalArgumentException("user doesn't exist"));

        Optional<Survey> oSurvey = surveyRepository.findById(scheduleRegistReq.getSurveyId());
        Survey survey = oSurvey.orElseThrow(() -> new IllegalArgumentException("survey doesn't exist"));

        int period = Period.between(survey.getStartDate(), survey.getEndDate()).getDays() + 1;

        Optional<ScheduleThumbnail> oScheduleThumbnail = scheduleThumbnailRepository.findById(scheduleRegistReq.getScheduleThumbnailId());
        ScheduleThumbnail scheduleThumbnail = oScheduleThumbnail.orElseThrow(() -> new IllegalArgumentException("scheduleThumbnail doesn't exist"));

        Schedule schedule = Schedule.builder()
                .user(user)
                .survey(survey)
                .scheduleThumbnail(scheduleThumbnail)
                .name(scheduleRegistReq.getName())
                .period(period)
                .isDelete(false)
                .isReview(false)
                .build();

        scheduleRepository.save(schedule);

        List<ScheduleRegistItem> scheduleRegistItemList = scheduleRegistReq.getScheduleRegistItemList();
        for(ScheduleRegistItem scheduleRegistItem : scheduleRegistItemList) {
            Optional<JejuPlace> oJejuPlace = jejuPlaceRepository.findById(scheduleRegistItem.getJejuPlaceId());
            JejuPlace jejuPlace = oJejuPlace.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));

            scheduleRegistItem.getJejuPlaceId();
            ScheduleItem scheduleItem = ScheduleItem.builder()
                    .schedule(schedule)
                    .jejuPlace(jejuPlace)
                    .day(scheduleRegistItem.getDay())
                    .build();

            scheduleItemRepository.save(scheduleItem);
        }

        redisTemplate.delete(redisTemplate.keys(REDIS_KEY_PREFIX+scheduleRegistReq.getUserId()));

        return new CommonRes(true, "일정 등록을 완료했습니다.");
    }

    // 설문 조사 카테고리 조회
    public List<Integer> getCategoryList(int surveyId) {
        List<Integer> categoryList = new ArrayList<>();
        List<SurveyFavorCategory> surveyFavorCategoryList = surveyFavorCategoryRepository.findAllBySurveyId(surveyId);

        for(SurveyFavorCategory surveyFavorCategory : surveyFavorCategoryList) {
            categoryList.add(surveyFavorCategory.getCategory().getId());
        }

        return categoryList;
    }

    // 설문 조사 Flask Req
    public FlaskSurveyItem getFlaskSurveyItem(int surveyId, List<Integer> categoryList) {
        Optional<Survey> oSurvey = surveyRepository.findById(surveyId);
        Survey survey = oSurvey.orElseThrow(() -> new IllegalArgumentException("survey doesn't exist"));

        FlaskSurveyItem flaskSurveyItem = FlaskSurveyItem.builder()
                .userId(survey.getUser().getId())
                .travelThemeCode(survey.getTravelThemeCode())
                .season(survey.getSeason())
                .surveyFavorCategoryList(categoryList)
                .build();

        return flaskSurveyItem;
    }

    // 제주 장소 Flask Req
    public List<FlaskJejuPlaceItem> getFlaskJejuItemList(List<Integer> categoryList, List<JejuPlace> jejuPlaceDeleteList) {
        List<JejuPlace> jejuPlaceList = new ArrayList<>();
        for(Integer id : categoryList) {
            List<JejuPlace> list = jejuPlaceRepository.findAllByCategoryId(id);
            for(JejuPlace jejuPlace : list) {
                jejuPlaceList.add(jejuPlace);
                System.out.print(jejuPlace.getId() + " ");
            }
        }

        System.out.println(jejuPlaceDeleteList.size());
        if(!jejuPlaceDeleteList.isEmpty()) {
            jejuPlaceDeleteList.forEach(jejuPlaceList::remove);
        }

        List<FlaskJejuPlaceItem> flaskJejuPlaceItemList = new ArrayList<>();

        for(JejuPlace jejuPlace : jejuPlaceList) {

            FlaskJejuPlaceItem flaskJejuPlaceItem = FlaskJejuPlaceItem.builder()
                    .jejuPlaceId(jejuPlace.getId())
                    .categoryId(jejuPlace.getCategory().getId())
                    .categoryName(jejuPlace.getCategory().getCategoryName())
                    .reviewScoreSum(jejuPlace.getReviewScoreSum())
                    .reviewCount(jejuPlace.getReviewCount())
                    .build();

            flaskJejuPlaceItemList.add(flaskJejuPlaceItem);
        }

        return flaskJejuPlaceItemList;
    }

    // 리뷰 Flask Req
    public List<FlaskReviewItem> getFlaskReviewItemList() {
        List<FlaskReviewItem> flaskReviewItemList = new ArrayList<>();
        List<Review> reviewList = reviewRepository.findAll();

        for (Review review : reviewList){
            FlaskReviewItem flaskReviewItem = FlaskReviewItem.builder()
                    .userId(review.getUser().getId())
                    .season(review.getScheduleItem().getSchedule().getSurvey().getSeason())
                    .travelThemeCode(review.getScheduleItem().getSchedule().getSurvey().getTravelThemeCode())
                    .jejuPlaceId(review.getJejuPlace().getId())
                    .score(review.getScore())
                    .scheduleId(review.getScheduleItem().getSchedule().getId())
                    .day(review.getScheduleItem().getDay())
                    .categoryId(review.getJejuPlace().getCategory().getId())
                    .build();

            flaskReviewItemList.add(flaskReviewItem);
        }
        return flaskReviewItemList;
    }

    @Override
    public SuccessRes<LinkedHashMap<String, List<JejuPlaceRes>>> getFirstRecommendJejuPlace(int surveyId) {
        List<Integer> categoryList = getCategoryList(surveyId);

        // Flask로 Req
        FlaskRecommendReq flaskRecommendReq = FlaskRecommendReq.builder()
                .flaskSurveyItem(getFlaskSurveyItem(surveyId, categoryList))
                .flaskJejuPlaceItemList(getFlaskJejuItemList(categoryList, new ArrayList<>()))
                .flaskReviewItemList(getFlaskReviewItemList())
                .build();

        HttpResponse<LinkedHashMap<String, List<Integer>>> httpResponse =  Unirest.post("https://j8b204.p.ssafy.io/flask/recommend")
                .header("Content-Type", "application/json")
                .body(flaskRecommendReq)
                .asObject(new GenericType<LinkedHashMap<String, List<Integer>>>() {});

        LinkedHashMap<String, List<Integer>> recommendMap = httpResponse.getBody();
        return new SuccessRes<LinkedHashMap<String, List<JejuPlaceRes>>>(true, "설문 조사에 대한 첫 추천 장소를 받습니다.", getResultMap(recommendMap));
    }

    @Override
    public SuccessRes<LinkedHashMap<String, List<JejuPlaceRes>>> getReloadRecommendJejuPlace(ScheduleReloadReq scheduleReloadReq) {
        List<JejuPlace> jejuPlaceDeleteList = new ArrayList<>();

        String userId = scheduleReloadReq.getUserId();
        Set<Object> deletePlaceIds = redisTemplate.opsForSet().members(REDIS_KEY_PREFIX + userId);
        if(!scheduleReloadReq.getPlaceDeleteId().isEmpty()){
            saveFilteredPlaces(scheduleReloadReq.getUserId(), scheduleReloadReq.getPlaceDeleteId());
            for (Object id : deletePlaceIds) {
                Optional<JejuPlace> oJejuPlace = jejuPlaceRepository.findById(Integer.parseInt((String) id));
                JejuPlace jejuPlace = oJejuPlace.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));
                jejuPlaceDeleteList.add(jejuPlace);
            }
            for (Object id : scheduleReloadReq.getPlaceDeleteId()){
                Optional<JejuPlace> oJejuPlace = jejuPlaceRepository.findById(Integer.parseInt((String) id));
                JejuPlace jejuPlace = oJejuPlace.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));
                jejuPlaceDeleteList.add(jejuPlace);
            }
        }

        List<Integer> categoryList = getCategoryList(scheduleReloadReq.getSurveyId());
        List<FlaskJejuPlaceItem> flaskJejuPlaceItemList = getFlaskJejuItemList(categoryList, jejuPlaceDeleteList);


        // Flask로 Req
        FlaskRecommendReq flaskRecommendReq = FlaskRecommendReq.builder()
                .flaskSurveyItem(getFlaskSurveyItem(scheduleReloadReq.getSurveyId(), categoryList))
                .flaskJejuPlaceItemList(flaskJejuPlaceItemList)
                .flaskReviewItemList(getFlaskReviewItemList())
                .flaskSceduleList(scheduleReloadReq.getSelectJejuPlaceList())
                .build();

        HttpResponse<LinkedHashMap<String, List<Integer>>> httpResponse =  Unirest.post("https://j8b204.p.ssafy.io/flask/recommend")
                .header("Content-Type", "application/json")
                .body(flaskRecommendReq)
                .asObject(new GenericType<LinkedHashMap<String, List<Integer>>>() {});

        LinkedHashMap<String, List<Integer>> recommendMap = httpResponse.getBody();
        return new SuccessRes<LinkedHashMap<String, List<JejuPlaceRes>>>(true, "재추천 장소를 받습니다.", getResultMap(recommendMap));
    }

    // 추천 결과
    public LinkedHashMap<String, List<JejuPlaceRes>> getResultMap(LinkedHashMap<String, List<Integer>> recommendMap) {
        LinkedHashMap<String, List<JejuPlaceRes>> resultMap = new LinkedHashMap<>();

        for(String str : recommendMap.keySet()) {
            List<Integer> list = recommendMap.get(str);
            List<JejuPlaceRes> jejuPlaceResList = new ArrayList<>();

            for(Integer id : list) {
                Optional<JejuPlace> oJejuPlace = jejuPlaceRepository.findById(id);
                JejuPlace jejuPlace = oJejuPlace.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));

                JejuPlaceRes jejuPlaceRes = JejuPlaceRes.builder()
                        .name(jejuPlace.getName())
                        .categoryId(jejuPlace.getCategory().getId())
                        .mapInfo(MapInfo.builder()
                                .jejuPlaceId(jejuPlace.getId())
                                .title(jejuPlace.getName())
                                .latlng(LatLng.builder().la(jejuPlace.getLatitude()).ma(jejuPlace.getLongitude()).build())
                                .build())
                        .roadAddress(jejuPlace.getRoadAddress())
                        .placeUrl(jejuPlace.getPlaceUrl())
                        .imgUrl(jejuPlace.getImgUrl())
                        .reviewScore((jejuPlace.getReviewCount() != 0) ? Math.round(((double) jejuPlace.getReviewScoreSum() / jejuPlace.getReviewCount())*10)/10.0 : 0)
                        .tag((jejuPlace.getTag() == null || jejuPlace.getTag().isBlank()) ? "" : "#" + jejuPlace.getTag().replace("_", " #"))
                        .build();

                jejuPlaceResList.add(jejuPlaceRes);
            }

            String categoryDescription = "";
            switch(str) {
                case "맛집" :
                    categoryDescription = "숨은 제주의 맛집! MY RESTAURANT";
                    break;
                case "카페/간식" :
                    categoryDescription = "내 맘에 쏙 드는 Cafe, 그 여유를 찾아서";
                    break;
                case "액티비티/체험" :
                    categoryDescription = "활발한게 좋다면? Activity!";
                    break;
                case "스포츠/레저" :
                    categoryDescription = "스포츠&레저의 메카, JEJU Island";
                    break;
                case "전시" :
                    categoryDescription = "기억에 남는 전시, 제주를 기억하다";
                    break;
                case "휴양" :
                    categoryDescription = "휴식이 공존하는 섬, 제주의 휴양지";
                    break;
                default:
                    break;
            }

            resultMap.put(categoryDescription, jejuPlaceResList);
        }
        return resultMap;
    }

    public void saveFilteredPlaces(String userId, List<String> filteredPlaces) {
        String redisKey = REDIS_KEY_PREFIX + userId;
        Set<String> uniqueIds = new HashSet<>(filteredPlaces);
        redisTemplate.opsForSet().add(redisKey, uniqueIds.toArray());
    }
}
