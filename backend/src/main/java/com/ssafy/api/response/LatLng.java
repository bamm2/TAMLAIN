package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LatLng {
    private Double La;
    private Double Ma;
    @Builder
    public LatLng(Double la, Double ma) {
        La = la;
        Ma = ma;
    }
}
