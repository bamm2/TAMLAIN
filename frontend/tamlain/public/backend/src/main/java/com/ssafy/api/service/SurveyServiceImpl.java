package com.ssafy.api.service;

import com.ssafy.api.request.SurveyRegistReq;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

@Service("SurveyService")
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {
    private final UserRepository userRepository;
    private final TravelThemeRepository travelThemeRepository;
    private final SurveyRepository surveyRepository;
    private final CategoryRepository categoryRepository;
    private final SurveyFavorCategoryRepository surveyFavorCategoryRepository;
    @Override
    public int[] registSurvey(SurveyRegistReq surveyRegistReq) {
        LinkedHashMap<Integer, List<String>> map = surveyRegistReq.getSurveyFavorCategoryMap();
        int count = 0, firstPage = 0;
        boolean flag = false;
        int[] result = new int[2];

        for(Integer key : map.keySet()) {
            if(map.get(key).isEmpty()) {
                count++;
                if(!flag) firstPage = key;
                flag = true;
            }
        }

        if(count > 3) {
            result[0] = -1; result[1] = firstPage;
            return result;
        }

        Optional<User> oUser = userRepository.findById(surveyRegistReq.getUserId());
        User user = oUser.orElseThrow(() -> new IllegalArgumentException("user doesn't exist"));

        Optional<TravelTheme> oTravelTheme = travelThemeRepository.findByName(surveyRegistReq.getTravelTheme());
        TravelTheme travelTheme = oTravelTheme.orElseThrow(() -> new IllegalArgumentException("travelTheme doesn't exist"));

        int month = surveyRegistReq.getStartDate().getMonthValue();
        String season = "";

        if(12 <= month && month <= 2) season = "겨울";
        else if(3 <= month && month <= 5) season = "봄";
        else if(6 <= month && month <= 8) season = "여름";
        else season = "가을";

        Survey survey = Survey.builder()
                .user(user)
                .startDate(surveyRegistReq.getStartDate())
                .endDate(surveyRegistReq.getEndDate())
                .travelThemeCode(travelTheme.getId())
                .season(season)
                .build();

        int surveyId = surveyRepository.save(survey).getId();

        for(Integer key : map.keySet()) {
            for(String scheduleName : map.get(key)) {
                Optional<Category> oCategory = categoryRepository.findByCategoryDetailName(scheduleName);
                Category category = oCategory.orElseThrow(() -> new IllegalArgumentException("category doesn't exist"));

                Optional<Survey> oSurvey = surveyRepository.findById(surveyId);
                Survey newSurvey = oSurvey.orElseThrow(() -> new IllegalArgumentException("survey doesn't exist"));

                SurveyFavorCategory surveyFavorCategory = SurveyFavorCategory.builder()
                        .survey(newSurvey)
                        .category(category)
                        .build();

                surveyFavorCategoryRepository.save(surveyFavorCategory);
            }
        }

        result[0] = 1; result[1] = surveyId;
        return result;
    }
}
