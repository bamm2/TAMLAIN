package com.ssafy.db.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
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
    private int reviewScoreSum;
    private int reviewCount;
    @Column(length = 150)
    private String tag;

    @Builder
    public JejuPlace(int reviewScoreSum, int reviewCount) {
        this.reviewScoreSum = reviewScoreSum;
        this.reviewCount = reviewCount;
    }

    public static JejuPlace of(JejuPlace jejuPlace, int reviewScoreSum, int reviewCount) {
        jejuPlace.setReviewScoreSum(reviewScoreSum);
        jejuPlace.setReviewCount(reviewCount);
        return jejuPlace;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof JejuPlace)) {
            return false;
        }
        JejuPlace other = (JejuPlace) obj;
        return Objects.equals(id, other.id);
    }
}
