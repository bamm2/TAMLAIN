package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@NoArgsConstructor
@ToString(of = {"id", "nickName"})
public class UserProfile {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "user_profile_id")
    private int id;

    @Column(nullable = false)
    private String nickName;

    @OneToOne(mappedBy = "userProfile", fetch = LAZY)
    private User user;

    private String provider;
    private String providerId;


    @Builder
    public UserProfile(String nickName, String provider, String providerId) {
        this.nickName = nickName;
        this.provider = provider;
        this.providerId = providerId;
    }
    public static UserProfile createProfile(String nickName, String provider, String providerId) {
        return UserProfile.builder()
                .nickName(nickName)
                .provider(provider)
                .providerId(providerId)
                .build();
    }

    public void setUser(User user) {
        this.user = user;
    }
}
