package com.ssafy.db.repository;

import com.ssafy.db.entity.SurveyFavorCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SurveyFavorCategoryRepository extends JpaRepository<SurveyFavorCategory, Integer> {
    List<SurveyFavorCategory> findAllBySurveyId(int surveyId);
}
