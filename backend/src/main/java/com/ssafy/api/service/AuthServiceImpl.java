package com.ssafy.api.service;

import com.ssafy.api.request.RefreshTokenRequest;
import com.ssafy.api.response.AccessTokenRes;
import com.ssafy.api.controller.auth.util.JwtTokenProvider;
import com.ssafy.db.entity.LoginUser;
import com.ssafy.db.entity.Token;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.exception.AuthenticationException;
import com.ssafy.api.controller.auth.util.RedisUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService{

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisUtil redisUtil;
    private final UserRepository userRepository;


    public AuthServiceImpl(JwtTokenProvider jwtTokenProvider, RedisUtil redisUtil, UserRepository userRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.redisUtil = redisUtil;
        this.userRepository = userRepository;
    }

    public boolean validatesAccessToken(String accessToken) {
        if (!jwtTokenProvider.validateToken(accessToken)) {
            throw new AuthenticationException("access token이 유효하지 않습니다.");
        }
        return false;
    }

    @Transactional(readOnly = true)
    public LoginUser findMemberByToken(String accessToken) {
        if (!jwtTokenProvider.validateToken(accessToken)) {
            return LoginUser.anonymous();
        }

        int id = Integer.parseInt(jwtTokenProvider.getPayload(accessToken));
        Optional<User> oUser = userRepository.findById(id);
        User user = oUser.orElseThrow(() -> new IllegalArgumentException("user doesn't exist"));
        return new LoginUser(user.getId());
    }

    @Transactional
    public AccessTokenRes refreshAccessToken(String accessToken, RefreshTokenRequest refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.getRefreshToken();
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new AuthenticationException("refresh token이 유효하지 않습니다.");
        }

        String id = jwtTokenProvider.getPayload(accessToken);
        String existingRefreshToken = redisUtil.getData(id);

        if (!existingRefreshToken.equals(refreshToken)) {
            throw new AuthenticationException("refresh token이 유효하지 않습니다.");
        }

        Token newAccessToken = jwtTokenProvider.createAccessToken(id);

        return new AccessTokenRes(newAccessToken.getValue());
    }

    @Transactional
    public void logout(String accessToken) {
        String id = jwtTokenProvider.getPayload(accessToken);
        redisUtil.deleteData(id);
    }
}
