package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ScheduleThumbnail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String thumbnailImageUrl;
}
