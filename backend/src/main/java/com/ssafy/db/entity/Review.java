package com.ssafy.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Review extends BaseEntity {
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

    @Builder
    public Review(User user, ScheduleItem scheduleItem, JejuPlace jejuPlace, int score) {
        this.user = user;
        this.scheduleItem = scheduleItem;
        this.jejuPlace = jejuPlace;
        this.score = score;
    }
}
