package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LatLng {
    @JsonProperty("La")
    private Double la;
    @JsonProperty("Ma")
    private Double ma;
    @Builder
    public LatLng(Double la, Double ma) {
        this.la = la;
        this.ma = ma;
    }
}
