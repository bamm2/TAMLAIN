package com.ssafy.api.controller;

import com.ssafy.api.request.RefreshTokenRequest;
import com.ssafy.api.response.AccessTokenRes;
import com.ssafy.api.service.AuthService;
import com.ssafy.api.service.OauthService;
import com.ssafy.api.response.LoginRes;
import com.ssafy.api.controller.auth.util.AuthorizationExtractor;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@Api(value = "소셜 로그인 API", tags = {"Oauth"})
@RequiredArgsConstructor
@Slf4j
@RestController()
@RequestMapping("/oauth")
public class OauthController {

    private final OauthService oauthService;
    private final AuthService authService;

    @ApiOperation(value = "로그인", notes = "로그인")
    @GetMapping("/callback/{provider}")
    public LoginRes login(@PathVariable String provider, @RequestParam String code){
        return oauthService.login(provider, code);
    }

    /**
     * @title access token 갱신
     */
    @ApiOperation(value = "토큰", notes = "access token 갱신")
    @PostMapping(value = "/token", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public AccessTokenRes refreshAccessToken(HttpServletRequest request,
                                                             @ModelAttribute RefreshTokenRequest refreshToken) throws AuthenticationException {
        String accessToken = AuthorizationExtractor.extract(request);
        return authService.refreshAccessToken(accessToken, refreshToken);
    }

    /**
     * @title 로그아웃
     */
    @ApiOperation(value = "로그아웃", notes = "로그아웃")
    @GetMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        String accessToken = AuthorizationExtractor.extract(request);
        authService.logout(accessToken);
        return ResponseEntity.noContent().build();
    }
}