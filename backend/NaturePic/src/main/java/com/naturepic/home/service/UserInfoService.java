package com.naturepic.home.service;

import com.naturepic.home.model.UserInfoDto;
import com.naturepic.home.model.entity.UserInfo;
import com.naturepic.home.model.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserInfoService implements IUserInfoService {

    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserInfoService userInfoService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserInfo> userDetail = repository.findByName( username );

        // Converting userDetail to UserDetails
        return userDetail.map( UserInfoDetails::new )
                .orElseThrow( () -> new UsernameNotFoundException( "User not found " + username ) );
    }

    public String addUser(UserInfo userInfo) {
        userInfo.setPassword( encoder.encode( userInfo.getPassword() ) );
        repository.save( userInfo );
        return "User Added Successfully";
    }

    public boolean isAdmin(UserInfo user) {
        return user.getRoles() != null && user.getRoles().contains( "ROLE_ADMIN" );
    }

    public UserInfo getUserByUsername(String username) {
        Optional<UserInfo> userInfoOptional = repository.findByName( username );
        if (userInfoOptional.isPresent()) {
            return userInfoOptional.get();
        } else {
            // Manejar el caso en que el usuario no se encuentra
            // Puedes lanzar una excepción personalizada o devolver null
            throw new RuntimeException( "User not found with username: " + username );
        }
    }

    public String assignAdminRole(String username) {
        UserInfo user = repository.findByName( username )
                .orElseThrow( () -> new RuntimeException( "User not found with username: " + username ) );

        if (!user.getRoles().contains( "ROLE_ADMIN" )) {
            user.setRoles( user.getRoles() + ",ROLE_ADMIN" );
            repository.save( user );
            return "Admin role assigned to user: " + username;
        } else {
            return "User already has admin role";
        }
    }

    public String revokeAdminRole(String username) {
        UserInfo user = repository.findByName(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        if (user.getRoles().contains("ROLE_ADMIN")) {
            // Comprobar si ROLE_ADMIN es el único rol
            if (user.getRoles().equals("ROLE_ADMIN")) {
                // Asignar ROLE_USER si ROLE_ADMIN es el único rol
                user.setRoles("ROLE_USER");
            } else {
                // Remover ROLE_ADMIN y mantener otros roles
                String updatedRoles = Arrays.stream(user.getRoles().split(","))
                        .filter(role -> !role.equals("ROLE_ADMIN"))
                        .collect(Collectors.joining(","));
                user.setRoles(updatedRoles);
            }
            repository.save(user);
            return "Admin role revoked from user: " + username;
        } else {
            return "User does not have admin role";
        }
    }

    public List<UserInfoDto> getAllUsers() {
        return repository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserInfoDto convertToDto(UserInfo userInfo) {
        return new UserInfoDto(
                (String) userInfo.getUsername(),
                userInfo.getFirstname(),
                userInfo.getSurname(),
                userInfo.getEmail(),
                userInfo.getRoles(),
                userInfo.getRoles() != null && userInfo.getRoles().contains( "ROLE_ADMIN" )
        );

    }
}