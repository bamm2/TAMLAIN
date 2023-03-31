package com.ssafy.db.repository;

import com.ssafy.db.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Integer> {
    Optional<Survey> findById(int id);
}
