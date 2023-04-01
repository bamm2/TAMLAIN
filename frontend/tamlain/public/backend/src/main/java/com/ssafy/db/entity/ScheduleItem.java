package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ScheduleItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "jeju_place_id")
    private JejuPlace jejuPlace;

    private int day;

    @Builder
    public ScheduleItem(Schedule schedule, JejuPlace jejuPlace, int day) {
        this.schedule = schedule;
        this.jejuPlace = jejuPlace;
        this.day = day;
    }
}
