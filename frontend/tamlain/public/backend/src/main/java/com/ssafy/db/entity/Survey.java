package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Survey extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate startDate;
    private LocalDate endDate;
    private int travelThemeCode;
    @Column(length = 4)
    private String season;
    private boolean isDelete;

    @Builder
    public Survey(User user, LocalDate startDate, LocalDate endDate, int travelThemeCode, String season, boolean isDelete) {
        this.user = user;
        this.startDate = startDate;
        this.endDate = endDate;
        this.travelThemeCode = travelThemeCode;
        this.season = season;
        this.isDelete = isDelete;
    }

    public static Survey of(Survey survey) {
        survey.setDelete(true);
        return survey;
    }
}
