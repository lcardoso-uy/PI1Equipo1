package com.naturepic.home.service;

import com.naturepic.home.model.entity.LoginAttempt;
import com.naturepic.home.model.entity.User;

import java.util.List;

public interface ILoginAttemptService {
    void logLoginAttempt(String email, boolean wasSuccessful, String ipAddress);
    User login(User user, String ipAddress); // Asumo que este método intenta realizar un inicio de sesión y retorna un usuario.
    LoginAttempt registerLoginAttempt(LoginAttempt loginAttempt);
    List<LoginAttempt> getAllLoginAttempts();
}