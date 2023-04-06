package com.ssafy.api.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommonRes {
    boolean success;
    String message;
}
