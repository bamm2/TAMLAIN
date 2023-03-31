package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@RedisHash("redisplace")
public class RedisPlace {

    @Id
    private String id;
    private Map<String, List<Integer>> jejuPlaceId;

    @Builder
    public RedisPlace(String id, Map<String, List<Integer>> jejuPlaceId) {
        this.id = id;
        this.jejuPlaceId = jejuPlaceId;
    }
}
