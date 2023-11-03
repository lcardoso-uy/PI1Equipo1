package com.naturepic.home.controller;

import com.naturepic.home.model.entity.LoginAttempt;
import com.naturepic.home.service.ILoginAttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/login-attempts")
public class LoginAttemptController {

    @Autowired
    private ILoginAttemptService loginAttemptService;

    @PostMapping
    public ResponseEntity<LoginAttempt> registerLoginAttempt(@RequestBody LoginAttempt loginAttempt) {
        LoginAttempt savedAttempt = loginAttemptService.registerLoginAttempt(loginAttempt);
        return new ResponseEntity<>(savedAttempt, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LoginAttempt>> getAllLoginAttempts() {
        List<LoginAttempt> loginAttempts = loginAttemptService.getAllLoginAttempts();
        return new ResponseEntity<>(loginAttempts, HttpStatus.OK);
    }

}
