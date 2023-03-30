package com.ssafy.db.entity;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JejuPlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(length = 150)
    private String name;
    private Double latitude;
    private Double longitude;
    private String roadAddress;
    private String placeUrl;
    private String imgUrl;
    @Column(length = 13)
    private String phoneNumber;
    private int reviewScoreSum;
    private int reviewCount;
}
