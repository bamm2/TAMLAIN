package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_item_id")
    private ScheduleItem scheduleItem;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "jeju_place_id")
    private JejuPlace jejuPlace;
    private int score;
    private LocalDateTime createdDate;
}
