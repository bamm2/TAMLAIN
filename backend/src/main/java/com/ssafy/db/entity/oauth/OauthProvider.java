package com.ssafy.db.entity.oauth;


import lombok.Builder;
import lombok.Getter;

@Getter
public class OauthProvider {
    private final String clientId;
    private final String redirectUrl;
    private final String tokenUrl;
    private final String userInfoUrl;

    public OauthProvider(OauthProperties.Member member, OauthProperties.Provider provider) {
        this(member.getClientId(), member.getRedirectUri(), provider.getTokenUri(), provider.getUserInfoUri());
    }

    @Builder
    public OauthProvider(String clientId, String redirectUrl, String tokenUrl, String userInfoUrl) {
        this.clientId = clientId;
        this.redirectUrl = redirectUrl;
        this.tokenUrl = tokenUrl;
        this.userInfoUrl = userInfoUrl;
    }
}