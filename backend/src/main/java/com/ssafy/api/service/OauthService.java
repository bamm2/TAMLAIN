package com.ssafy.api.service;


import com.ssafy.api.response.LoginRes;
import com.ssafy.api.response.OauthTokenRes;
import com.ssafy.db.entity.User;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.util.MultiValueMap;

import java.util.Map;

public interface OauthService {

    LoginRes login(String providerName, String code);

    OauthTokenRes getToken(String code, ClientRegistration provider);

    MultiValueMap<String, String> tokenRequest(String code, ClientRegistration provider);

    User getUserProfile(String providerName, OauthTokenRes tokenResponse, ClientRegistration provider);

    Map<String, Object> getUserAttributes(ClientRegistration provider, OauthTokenRes tokenResponse);

}
