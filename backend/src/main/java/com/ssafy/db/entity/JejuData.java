package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JejuData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false, columnDefinition = "INT UNSIGNED")
    private Long id;
    @Column(length = 150)
    private String name;
    private Double latitude;
    private Double longitude;
    private String roadAddress;
    private String placeUrl;
    private String imgUrl;
    @Column(length = 13)
    private String phoneNumber;
    @Column(columnDefinition = "INT UNSIGNED")
    private Long sumRating;
    @Column(columnDefinition = "INT UNSIGNED")
    private Long totalRating;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_items_id")
    private CategoryItems categoryItems;

}
