package com.naturepic.home.service;

import com.naturepic.home.model.entity.UserInfo;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserInfoService extends UserDetailsService {

    String addUser(UserInfo userInfo);

    boolean isAdmin(UserInfo user);

    UserInfo getUserByUsername(String username);

    String assignAdminRole(String username);

    // Puedes añadir aquí otros métodos que necesites exponer
}
