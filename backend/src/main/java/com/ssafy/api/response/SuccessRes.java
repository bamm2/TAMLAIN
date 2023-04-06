package com.ssafy.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class SuccessRes<T> extends CommonRes {
    T data;

    public SuccessRes(boolean success, String message, T data) {
        super(success, message);
        this.data = data;
    }
}
