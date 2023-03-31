package com.ssafy.api.service;

import com.ssafy.api.request.RefreshTokenRequest;
import com.ssafy.api.response.AccessTokenRes;
import com.ssafy.config.JwtTokenProvider;
import com.ssafy.db.entity.Token;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.exception.AuthenticationException;
import com.ssafy.util.RedisUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public void validatesAccessToken(String accessToken) {
        if (!jwtTokenProvider.validateToken(accessToken)) {
            throw new AuthenticationException("access token이 유효하지 않습니다.");
        }
    }

//    @Transactional(readOnly = true)
//    public LoginMember findMemberByToken(String accessToken) {
//        if (!jwtTokenProvider.validateToken(accessToken)) {
//            return LoginMember.anonymous();
//        }
//
//        int id = Integer.parseInt(jwtTokenProvider.getPayload(accessToken));
//        User user = userRepository.findById(id);
//        return new LoginMember(member.getId());
//    }

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

        Token newAccessToken = jwtTokenProvider.createAccessTok(id);

        return new AccessTokenRes(newAccessToken.getValue());
    }

    @Transactional
    public void logout(String accessToken) {
        String id = jwtTokenProvider.getPayload(accessToken);
        redisUtil.deleteData(id);
    }
}
