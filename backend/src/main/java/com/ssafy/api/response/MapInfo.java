package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MapInfo {
    private int jejuPlaceId;
    private String title;
    private LatLng latlng;

    @Builder
    public MapInfo(int jejuPlaceId, String title, LatLng latlng) {
        this.jejuPlaceId = jejuPlaceId;
        this.title = title;
        this.latlng = latlng;
    }
}
