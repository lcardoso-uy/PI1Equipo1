package com.naturepic.home.service;

import com.naturepic.home.model.entity.LoginAttempt;
import com.naturepic.home.model.entity.User;
import com.naturepic.home.model.repository.LoginAttemptRepository;
import com.naturepic.home.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LoginAttemptService implements ILoginAttemptService {

    @Autowired
    private LoginAttemptRepository loginAttemptRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void logLoginAttempt(String email, boolean wasSuccessful, String ipAddress) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            LoginAttempt attempt = new LoginAttempt();
            attempt.setEmail(email);
            attempt.setWasSuccessful(wasSuccessful);
            attempt.setIpAddress(ipAddress);
            attempt.setAttemptTime(LocalDateTime.now());
            attempt.setUser(user);
            loginAttemptRepository.save(attempt);
        }
    }

    @Override
    public User login(User user, String ipAddress) {
        // Implementa tu lógica de inicio de sesión aquí.
        // Por ejemplo, verifica el email y la contraseña del usuario.
        // Luego, utiliza logLoginAttempt para registrar el intento.
        return null;
    }

    @Override
    public LoginAttempt registerLoginAttempt(LoginAttempt loginAttempt) {
        return loginAttemptRepository.save(loginAttempt);
    }

    @Override
    public List<LoginAttempt> getAllLoginAttempts() {
        return loginAttemptRepository.findAll();
    }
}
