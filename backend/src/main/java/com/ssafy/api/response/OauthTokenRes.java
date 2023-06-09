package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Getter
@NoArgsConstructor
public class OauthTokenRes {

    @JsonProperty("access_token")
    private String accessToken;

    private String scope;

    @JsonProperty("token_type")
    private String tokenType;

    @JsonProperty("error")
    String error;

    @JsonProperty("error_description")
    String errorDescription;

    @JsonProperty("error_uri")
    String errorUri;

    @Builder
    public OauthTokenRes(String accessToken, String scope, String tokenType, String error, String errorDescription, String errorUri) {
        this.accessToken = accessToken;
        this.scope = scope;
        this.tokenType = tokenType;
        this.error = error;
        this.errorDescription = errorDescription;
        this.errorUri = errorUri;
    }

    public boolean isNotValid() {
        return Objects.isNull(accessToken);
    }
}
