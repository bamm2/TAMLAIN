package com.ssafy.db.repository;

import com.ssafy.db.entity.JejuPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JejuPlaceRepository extends JpaRepository<JejuPlace, Integer> {
    Optional<JejuPlace> findById(int id);
    List<JejuPlace> findByNameContaining(String name);
    List<JejuPlace> findAll();
//    List<JejuPlace> findAllByCategoryId(Iterable<Integer> ids);

    List<JejuPlace> findAllByCategoryId(int categoryId);
}
