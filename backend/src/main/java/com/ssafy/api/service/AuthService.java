package com.ssafy.api.service;

import com.ssafy.api.request.RefreshTokenRequest;
import com.ssafy.api.response.AccessTokenRes;
import com.ssafy.db.entity.LoginUser;
import org.apache.tomcat.websocket.AuthenticationException;

public interface AuthService {

    void validatesAccessToken(String accessToken);

    void logout(String accessToken);

    AccessTokenRes refreshAccessToken(String accessToken, RefreshTokenRequest refreshTokenRequest);

    LoginUser findMemberByToken(String accessToken);
}
