package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MapInfo {
    private String title;
    private LatLng latlng;

    @Builder
    public MapInfo(String title, LatLng latlng) {
        this.title = title;
        this.latlng = latlng;
    }
}
