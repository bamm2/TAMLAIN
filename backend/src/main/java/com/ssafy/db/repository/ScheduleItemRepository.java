package com.ssafy.db.repository;

import com.ssafy.db.entity.ScheduleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleItemRepository extends JpaRepository<ScheduleItem, Integer> {
    Optional<ScheduleItem> findById(int id);
    List<ScheduleItem> findAllByScheduleId(int Id);
}
