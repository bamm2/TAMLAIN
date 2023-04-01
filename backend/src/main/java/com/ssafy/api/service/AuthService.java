package com.ssafy.api.service;

import com.ssafy.api.request.RefreshTokenRequest;
import com.ssafy.api.response.AccessTokenRes;
import org.apache.tomcat.websocket.AuthenticationException;

public interface AuthService {

    public void validatesAccessToken(String accessToken) throws AuthenticationException;

    public void logout(String accessToken);

    public AccessTokenRes refreshAccessToken(String accessToken, RefreshTokenRequest refreshTokenRequest) throws AuthenticationException ;

    //    public LoginMember findMemberByToken(String accessToken);
}
