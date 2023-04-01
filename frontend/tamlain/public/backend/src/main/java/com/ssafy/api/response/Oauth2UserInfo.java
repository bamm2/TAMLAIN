package com.ssafy.api.response;

import java.time.LocalDateTime;

public interface Oauth2UserInfo {

    public String getProviderId();
    public String getProvider();
    public String getEmail();
    public String getNickName();

}
