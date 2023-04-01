package com.ssafy.exception;

import org.springframework.http.HttpStatus;

public class AuthenticationException extends DropTheCodeException {

    public AuthenticationException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}