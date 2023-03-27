package com.ssafy.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicUpdate
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id")
    private Survey survey;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_thumbnail_id")
    private ScheduleThumbnail scheduleThumbnail;

    @Column(length = 40)
    private String name;
    private int period;
    private boolean isDelete;
    private boolean isReview;
    @CreatedDate
    private LocalDateTime createdDate;

    @Builder
    public Schedule(User user, Survey survey, ScheduleThumbnail scheduleThumbnail, String name, int period, boolean isDelete, boolean isReview) {
        this.user = user;
        this.survey = survey;
        this.scheduleThumbnail = scheduleThumbnail;
        this.name = name;
        this.period = period;
        this.isDelete = isDelete;
        this.isReview = isReview;
    }
}