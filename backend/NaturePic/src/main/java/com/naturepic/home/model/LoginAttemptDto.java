package com.naturepic.home.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class LoginAttemptDto {

    private Long id;
    private String email;
    private LocalDateTime attemptTime;
    private Boolean wasSuccessful;
    private String ipAddress;

    private Long userId;
}