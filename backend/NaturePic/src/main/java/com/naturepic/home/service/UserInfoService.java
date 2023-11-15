package com.naturepic.home.service;

import com.naturepic.home.model.entity.UserInfo;
import com.naturepic.home.model.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserInfo> userDetail = repository.findByName(username);

        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public String addUser(UserInfo userInfo) {
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "User Added Successfully";
    }

    public boolean isAdmin(UserInfo user) {
        return user.getRoles() != null && user.getRoles().contains("ROLE_ADMIN");
    }

    public UserInfo getUserByUsername(String username) {
        Optional<UserInfo> userInfoOptional = repository.findByName(username);
        if (userInfoOptional.isPresent()) {
            return userInfoOptional.get();
        } else {
            // Manejar el caso en que el usuario no se encuentra
            // Puedes lanzar una excepción personalizada o devolver null
            throw new RuntimeException("User not found with username: " + username);
        }
    }
}
