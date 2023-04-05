package com.ssafy.api.controller.auth.util;


import com.ssafy.db.entity.oauth.OauthProperties;
import com.ssafy.db.entity.oauth.OauthProvider;

import java.util.HashMap;
import java.util.Map;


public class OauthAdapter {

    private OauthAdapter() {}

    public static Map<String, OauthProvider> getOauthProviders(OauthProperties properties) {
        Map<String, OauthProvider> oauthProvider = new HashMap<>();

        properties.getMember().forEach((key, value) -> oauthProvider.put(key,
                new OauthProvider(value, properties.getProvider().get(key))));
        return oauthProvider;
    }
}