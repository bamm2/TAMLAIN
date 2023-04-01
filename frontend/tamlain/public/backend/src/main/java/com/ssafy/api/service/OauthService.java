package com.ssafy.api.service;


import com.ssafy.api.response.LoginRes;
import com.ssafy.api.response.OauthTokenRes;
import com.ssafy.db.entity.User;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.util.MultiValueMap;

import java.util.Map;

public interface OauthService {

    public LoginRes login(String providerName, String code);

    public OauthTokenRes getToken(String code, ClientRegistration provider);

    public MultiValueMap<String, String> tokenRequest(String code, ClientRegistration provider);

    public User getUserProfile(String providerName, OauthTokenRes tokenResponse, ClientRegistration provider);

    public Map<String, Object> getUserAttributes(ClientRegistration provider, OauthTokenRes tokenResponse);

}
