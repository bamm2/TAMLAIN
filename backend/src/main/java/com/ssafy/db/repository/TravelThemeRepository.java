package com.ssafy.db.repository;

import com.ssafy.db.entity.TravelTheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TravelThemeRepository extends JpaRepository<TravelTheme, Integer> {
    Optional<TravelTheme> findByName(String name);
}
