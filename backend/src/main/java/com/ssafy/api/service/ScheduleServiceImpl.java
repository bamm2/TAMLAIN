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
    private final RedisTemplate<String, RedisPlace> redisTemplate;

    @Override
    public List<SearchPlaceRes> getserarchPlace(String keyword) {
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
                    map);
            serachPlaceResList.add(serachPlaceRes);
        }

        return serachPlaceResList;
    }

    @Override
    public List<SearchPlaceRes> getserarchPlace() {
        List<JejuPlace> jejuPlaceList = jejuPlaceRepository.findAll();
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
                    map);
            serachPlaceResList.add(serachPlaceRes);
        }
        return serachPlaceResList;
    }

    @Override
    public PlaceDetailRes getPlaceDetail(int jejuPlaceId) {
        Optional<JejuPlace> oJejuPlaces = jejuPlaceRepository.findById(jejuPlaceId);
        JejuPlace jejuPlace = oJejuPlaces.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));

        return PlaceDetailRes.builder()
                .placeUrl(jejuPlace.getPlaceUrl())
                .reviewScore((double) (jejuPlace.getReviewScoreSum() / jejuPlace.getReviewCount()))
                .la(jejuPlace.getLatitude())
                .ma(jejuPlace.getLongitude())
                .jejuPlaceName(jejuPlace.getName())
                .roadAddress(jejuPlace.getRoadAddress())
                .build();
    }



    @Override
    public List<ScheduleThumbnailRes> getScheduleThumbnail() {
        List<ScheduleThumbnail> scheduleThumbnailList = scheduleThumbnailRepository.findAll();
        List<ScheduleThumbnailRes> scheduleThumbnailResList = new ArrayList<>();

        for(ScheduleThumbnail scheduleThumbnail : scheduleThumbnailList) {
            ScheduleThumbnailRes scheduleThumbnailRes = ScheduleThumbnailRes.builder()
                    .scheduleThumbnailId(scheduleThumbnail.getId())
                    .thumbnailImageUrl(scheduleThumbnail.getThumbnailImageUrl())
                    .build();
            scheduleThumbnailResList.add(scheduleThumbnailRes);
        }
        return scheduleThumbnailResList;
    }

    @Override
    public void registSchedule(ScheduleRegistReq scheduleRegistReq) {
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

        //redis있는 내용 전체 삭제
        redisTemplate.delete(redisTemplate.keys("*"));
    }

    @Override
    public LinkedHashMap<String, List<JejuPlaceRes>> getRecommendJejuPlace(int surveyId) {
        Optional<Survey> oSurvey = surveyRepository.findById(surveyId);
        Survey survey = oSurvey.orElseThrow(() -> new IllegalArgumentException("survey doesn't exist"));

        List<JejuPlace> jejuPlaceList = jejuPlaceRepository.findAll();
        List<FlaskJejuPlaceItem> flaskJejuPlaceItemList = new ArrayList<>();

        List<SurveyFavorCategory> surveyFavorCategoryList = surveyFavorCategoryRepository.findAllBySurveyId(surveyId);
        List<Integer> categoryList = new ArrayList<>();
        for(SurveyFavorCategory surveyFavorCategory : surveyFavorCategoryList) {
            categoryList.add(surveyFavorCategory.getCategory().getId());
        }

        FlaskSurveyReq flaskSurveyReq = FlaskSurveyReq.builder()
                .userId(survey.getUser().getId())
                .startDate(survey.getStartDate())
                .endDate(survey.getEndDate())
                .travelThemeCode(survey.getTravelThemeCode())
                .season(survey.getSeason())
                .surveyFavorCategoryList(categoryList)
                .build();

        getFlaskJejuItem(jejuPlaceList, flaskJejuPlaceItemList);


        List<Review> reviewList = reviewRepository.findAll();
        List<ReviewItem> reviewItems = new ArrayList<>();
        for (Review review : reviewList){
            ReviewItem reviewItem = ReviewItem.builder()
                    .jejuPlaceImgUrl(review.getJejuPlace().getPlaceUrl())
                    .jejuPlaceName(review.getJejuPlace().getName())
                    .score(review.getScore())
                    .build();
            reviewItems.add(reviewItem);
        }

        FlaskRecommendReq recommendReq = FlaskRecommendReq.builder()
                .flaskSurveyReq(flaskSurveyReq)
                .flaskJejuPlaceItemList(flaskJejuPlaceItemList)
                .reviewItem(reviewItems)
                .build();

        HttpResponse<LinkedHashMap<String, List<Integer>>> httpResponse =  Unirest.post("http://127.0.0.1:5000/recommend")
                .header("Content-Type", "application/json")
                .body(recommendReq)
                .asObject(new GenericType<LinkedHashMap<String, List<Integer>>>() {});

        LinkedHashMap<String, List<Integer>> recommendMap = httpResponse.getBody();
        LinkedHashMap<String, List<JejuPlaceRes>> resultMap = new LinkedHashMap<>();
        List<JejuPlaceRes> jejuPlaceResList = new ArrayList<>();
        for(String str : recommendMap.keySet()) {
            List<Integer> list = recommendMap.get(str);
            for(Integer i : list) {
                Optional<JejuPlace> oJejuPlace = jejuPlaceRepository.findById(i);
                JejuPlace jejuPlace = oJejuPlace.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));

                JejuPlaceRes jejuPlaceRes = JejuPlaceRes.builder()
                        .name(jejuPlace.getName())
                        .categoryId(jejuPlace.getCategory().getId())
                        .mapInfo(MapInfo.builder()
                                .title(jejuPlace.getName())
                                .latlng(LatLng.builder().la(jejuPlace.getLatitude()).ma(jejuPlace.getLongitude()).build())
                                .build())
                        .roadAddress(jejuPlace.getRoadAddress())
                        .placeUrl(jejuPlace.getPlaceUrl())
                        .imgUrl(jejuPlace.getImgUrl())
                        .reviewScore((double) (jejuPlace.getReviewScoreSum() / jejuPlace.getReviewCount()))
                        .tag("#" + jejuPlace.getTag().replace("_", " #"))
                        .build();

                jejuPlaceResList.add(jejuPlaceRes);
            }

            String categoryDescription = "";
            switch(str) {
                case "맛집" :
                    categoryDescription = "탐나's RESTAURANT PICK";
                    break;
                case "카페/간식" :
                    categoryDescription = "아직";
                    break;
                case "액티비티/체험" :
                    categoryDescription = "다";
                    break;
                case "스포츠/레저" :
                    categoryDescription = "안정함";
                    break;
                case "전시" :
                    categoryDescription = "ㅠ";
                    break;
                case "휴양" :
                    categoryDescription = "ㅠ";
                    break;
                default:
                    break;
            }

            resultMap.put(categoryDescription, jejuPlaceResList);
        }

        return resultMap;
    }

    @Override
    public LinkedHashMap<String, List<JejuPlaceRes>> getReloadRecommendJejuPlace(ScheduleReloadReq scheduleReloadReq)  {
        Optional<Survey> oSurvey = surveyRepository.findById(scheduleReloadReq.getSurveyId());
        Survey survey = oSurvey.orElseThrow(() -> new IllegalArgumentException("survey doesn't exist"));

        List<JejuPlace> jejuPlaceList = jejuPlaceRepository.findAll();
        List<JejuPlace> jejuPlaceDeleteList = new ArrayList<>();
        System.out.println("----------------" + scheduleReloadReq.getSurveyId());
        System.out.println(scheduleReloadReq.getPlaceDeleteId().keySet());
        for(List<Integer> In : scheduleReloadReq.getPlaceDeleteId().values()){
            for(int i : In) {
                Optional<JejuPlace> oJejuPlace = jejuPlaceRepository.findById(i);
                JejuPlace jejuPlace = oJejuPlace.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));
                jejuPlaceDeleteList.add(jejuPlace);
            }
        }

        // redis 값이 있다면 추가해서 보내주는 것
        if(redisTemplate.keys("*").size() != 0){
            for (String key : redisTemplate.keys("*")){
                Optional<JejuPlace> oJejuPlace = jejuPlaceRepository.findById(Integer.parseInt(key));
                JejuPlace jejuPlace = oJejuPlace.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));
                jejuPlaceDeleteList.add(jejuPlace);

            }
        }
        //redis 값 추가
        saveJejuPlace(scheduleReloadReq);

        // 삭제된 값들 저장 완료
        jejuPlaceList.removeAll(jejuPlaceDeleteList);
        List<FlaskJejuPlaceItem> flaskJejuPlaceItemList = new ArrayList<>();

        // 선택된 값들 저장
        HashMap<Integer, List<FlaskJejuPlaceItem>> scheduleItemMap = new HashMap<>();
        for(String key : scheduleReloadReq.getPlaceSelectId().keySet()){
            List<JejuPlace> jejuPlaceSelectList = new ArrayList<>();
            List<FlaskJejuPlaceItem> flaskJejuPlaceSelectItemList = new ArrayList<>();
            for(int i : scheduleReloadReq.getPlaceSelectId().get(key)) {
                Optional<JejuPlace> oJejuPlace = jejuPlaceRepository.findById(i);
                JejuPlace jejuPlace = oJejuPlace.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));
                jejuPlaceSelectList.add(jejuPlace);
                // 보내는 형식에 맞게 변환
                getFlaskJejuItem(jejuPlaceSelectList, flaskJejuPlaceSelectItemList);
            }
            scheduleItemMap.put(Integer.parseInt(key), flaskJejuPlaceSelectItemList);
        }


        List<SurveyFavorCategory> surveyFavorCategoryList = surveyFavorCategoryRepository.findAllBySurveyId(scheduleReloadReq.getSurveyId());
        List<Integer> categoryList = new ArrayList<>();
        for(SurveyFavorCategory surveyFavorCategory : surveyFavorCategoryList) {
            categoryList.add(surveyFavorCategory.getCategory().getId());
        }

        FlaskSurveyReq flaskSurveyReq = FlaskSurveyReq.builder()
                .userId(survey.getUser().getId())
                .startDate(survey.getStartDate())
                .endDate(survey.getEndDate())
                .travelThemeCode(survey.getTravelThemeCode())
                .season(survey.getSeason())
                .surveyFavorCategoryList(categoryList)
                .build();

        getFlaskJejuItem(jejuPlaceList, flaskJejuPlaceItemList);

        // 리뷰 확인
        List<Review> reviewList = reviewRepository.findAll();
        List<ReviewItem> reviewItems = new ArrayList<>();
        for (Review review : reviewList){
            ReviewItem reviewItem = ReviewItem.builder()
                    .jejuPlaceImgUrl(review.getJejuPlace().getPlaceUrl())
                    .jejuPlaceName(review.getJejuPlace().getName())
                    .score(review.getScore())
                    .build();
            reviewItems.add(reviewItem);
        }
//        List<SurveyFavorCategory> surveyFavorCategoryList = s.findAllBySurveyId(scheduleReloadReq.getSurveyId());
//        List<Integer> categoryList = new ArrayList<>();
//        for(SurveyFavorCategory surveyFavorCategory : surveyFavorCategoryList) {
//            categoryList.add(surveyFavorCategory.getCategory().getId());
//        }

        FlaskRecommendReq recommendReq = FlaskRecommendReq.builder()
                .flaskSurveyReq(flaskSurveyReq)
                .flaskJejuPlaceItemList(flaskJejuPlaceItemList)
                .scheduleItemMap(scheduleItemMap)
                .reviewItem(reviewItems)
                .build();

        HttpResponse<LinkedHashMap<String, List<Integer>>> httpResponse =  Unirest.post("http://127.0.0.1:5000/recommend")
                .header("Content-Type", "application/json")
                .body(recommendReq)
                .asObject(new GenericType<LinkedHashMap<String, List<Integer>>>() {});

        LinkedHashMap<String, List<Integer>> recommendMap = httpResponse.getBody();
        LinkedHashMap<String, List<JejuPlaceRes>> resultMap = new LinkedHashMap<>();
        List<JejuPlaceRes> jejuPlaceResList = new ArrayList<>();
        for(String str : recommendMap.keySet()) {
            List<Integer> list = recommendMap.get(str);
            for(Integer i : list) {
                Optional<JejuPlace> oJejuPlace = jejuPlaceRepository.findById(i);
                JejuPlace jejuPlace = oJejuPlace.orElseThrow(() -> new IllegalArgumentException("jejuPlace doesn't exist"));

                Double divide = 0.0;
                if (jejuPlace.getReviewCount() != 0) {
                    divide = (double) (jejuPlace.getReviewScoreSum() / jejuPlace.getReviewCount());
                }
                JejuPlaceRes jejuPlaceRes = JejuPlaceRes.builder()
                        .name(jejuPlace.getName())
                        .categoryId(jejuPlace.getCategory().getId())
                        .mapInfo(MapInfo.builder()
                                .title(jejuPlace.getName())
                                .latlng(LatLng.builder().la(jejuPlace.getLatitude()).ma(jejuPlace.getLongitude()).build())
                                .build())
                        .roadAddress(jejuPlace.getRoadAddress())
                        .placeUrl(jejuPlace.getPlaceUrl())
                        .imgUrl(jejuPlace.getImgUrl())
                        .reviewScore(divide)
                        .tag("#" + jejuPlace.getTag().replace("_", " #"))
                        .build();

                jejuPlaceResList.add(jejuPlaceRes);
            }

            String categoryDescription = "";
            switch(str) {
                case "맛집" :
                    categoryDescription = "탐나's RESTAURANT PICK";
                    break;
                case "카페/간식" :
                    categoryDescription = "아직";
                    break;
                case "액티비티/체험" :
                    categoryDescription = "다";
                    break;
                case "스포츠/레저" :
                    categoryDescription = "안정함";
                    break;
                case "전시" :
                    categoryDescription = "ㅠ";
                    break;
                case "휴양" :
                    categoryDescription = "ㅠ";
                    break;
                default:
                    break;
            }

            resultMap.put(categoryDescription, jejuPlaceResList);
        }


        System.out.println();
        return resultMap;
    }


    @Override
    public void saveJejuPlace(ScheduleReloadReq scheduleReloadReq) {
        for(Map.Entry<String, List<Integer>> entry : scheduleReloadReq.getPlaceDeleteId().entrySet()){
            RedisPlace redisPlace = new RedisPlace(entry.getKey(), Collections.singletonMap(entry.getKey(), entry.getValue()));
            redisTemplate.opsForHash().putAll(entry.getKey(), redisPlace.getJejuPlaceId());
        }
    }

    @Override
    public Map<String, List<Integer>> getJejuPlace(String id) {
        Map<Object, Object> result = redisTemplate.opsForHash().entries(id);
        Map<String, List<Integer>> data = new HashMap<>();
        for (Map.Entry<Object, Object> entry : result.entrySet()) {
            String key = entry.getKey().toString();
            data.put(key, (List<Integer>) entry.getValue());
        }
        return data;
    }
    private void getFlaskJejuItem(List<JejuPlace> jejuPlaceList, List<FlaskJejuPlaceItem> flaskJejuPlaceItemList) {
        for(JejuPlace jejuPlace : jejuPlaceList) {

            Double divide = 0.0;
            if (jejuPlace.getReviewCount() != 0) {
                divide = (double) (jejuPlace.getReviewScoreSum() / jejuPlace.getReviewCount());
            }
            FlaskJejuPlaceItem flaskJejuPlaceItem = FlaskJejuPlaceItem.builder()
                    .jejuPlaceId(jejuPlace.getId())
                    .name(jejuPlace.getName())
                    .categoryId(jejuPlace.getCategory().getId())
                    .categoryName(jejuPlace.getCategory().getCategoryName())
                    .categoryDetailName(jejuPlace.getCategory().getCategoryDetailName())
                    .latitude(jejuPlace.getLatitude())
                    .longitude(jejuPlace.getLongitude())
                    .reviewScore(divide)
                    .build();

            flaskJejuPlaceItemList.add(flaskJejuPlaceItem);
        }
    }


}
