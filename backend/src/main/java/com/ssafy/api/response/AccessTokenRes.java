package com.ssafy.api.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AccessTokenRes {
    /**
     * 갱신된 access Token
     */
    private String accessToken;

    public AccessTokenRes(String accessToken) {
        this.accessToken = accessToken;
    }
}