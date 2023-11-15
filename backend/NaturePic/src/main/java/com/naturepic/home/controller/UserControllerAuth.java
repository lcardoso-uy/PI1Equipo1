package com.naturepic.home.controller;

import com.naturepic.home.model.entity.AuthRequest;
import com.naturepic.home.model.entity.UserInfo;
import com.naturepic.home.service.JwtService;
import com.naturepic.home.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class UserControllerAuth {

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

    @PostMapping("/addNewUser")
    public String addNewUser(@RequestBody UserInfo userInfo) {
        return service.addUser(userInfo);
    }

    @GetMapping("/user/userProfile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String userProfile() {
        return "Welcome to User Profile";
    }

    @GetMapping("/admin/adminProfile")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }

    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }

    @GetMapping("/getUserInfo")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) {
        try {
            token = token.substring(7); // Elimina 'Bearer '
            String username = jwtService.extractUsername(token);

            if (jwtService.isTokenValid(token, username)) {
                UserInfo userInfo = service.getUserByUsername(username);
                Map<String, Object> userInfoMap = new HashMap<>();
                userInfoMap.put("username", userInfo.getUsername());
                userInfoMap.put("firstname", userInfo.getFirstname());
                userInfoMap.put("surname", userInfo.getSurname());
                userInfoMap.put("email", userInfo.getEmail());
                userInfoMap.put("roles", userInfo.getRoles());
                userInfoMap.put("isAdmin", service.isAdmin(userInfo)); // Usa el método isAdmin

                return ResponseEntity.ok(userInfoMap);
            } else {
                return ResponseEntity.status( HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }


}
