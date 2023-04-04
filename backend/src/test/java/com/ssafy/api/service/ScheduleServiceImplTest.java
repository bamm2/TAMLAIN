package com.ssafy.api.service;

import org.springframework.data.redis.core.RedisTemplate;

class ScheduleServiceImplTest {

    private static RedisTemplate<String, RedisPlace> redisTemplate = null;

    ScheduleServiceImplTest(RedisTemplate<String, RedisPlace> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public static void main(String[] args) {
        System.out.println(redisTemplate.keys("*"));
    }
}