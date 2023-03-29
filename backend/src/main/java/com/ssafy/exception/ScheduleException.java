package com.ssafy.exception;

import org.springframework.http.HttpStatus;

public class ScheduleException extends DropTheCodeException {
    public ScheduleException() {
        super("schedule doesn't exist", HttpStatus.UNAUTHORIZED);
    }
}
