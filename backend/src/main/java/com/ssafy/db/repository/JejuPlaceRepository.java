package com.ssafy.db.repository;

import com.ssafy.db.entity.JejuPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JejuPlaceRepository extends JpaRepository<JejuPlace, Integer> {
    Optional<JejuPlace> findById(int id);
}