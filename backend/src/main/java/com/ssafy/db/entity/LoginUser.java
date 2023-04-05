package com.ssafy.db.entity;

import com.ssafy.exception.AuthenticationException;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginUser {
    private static final LoginUser ANONYMOUS = new LoginUser();

    private int id;

    public LoginUser(int id) {
        this.id = id;
    }

    public static LoginUser anonymous() {
        return ANONYMOUS;
    }

    public void validatesAnonymous() {
        if (ANONYMOUS.equals(this)) {
            throw new AuthenticationException("유효하지 않은 유저입니다.");
        }
    }
}