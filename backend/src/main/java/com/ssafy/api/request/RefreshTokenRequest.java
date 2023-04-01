package com.ssafy.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RefreshTokenRequest {

    private String refreshToken;

    public RefreshTokenRequest(String refreshToken){
        this.refreshToken = refreshToken;
    }
}
