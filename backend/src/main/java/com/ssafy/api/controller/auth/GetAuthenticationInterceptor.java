package com.ssafy.api.controller.auth;


import com.ssafy.api.service.AuthService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GetAuthenticationInterceptor extends AuthenticationInterceptor {

    public GetAuthenticationInterceptor(AuthService authService) {
        super(authService);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (isPreflight(request) || !isGet(request)) {
            return true;
        }
        validatesToken(request);
        return true;
    }
}