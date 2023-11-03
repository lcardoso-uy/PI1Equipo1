package com.naturepic.home.service;

import com.naturepic.home.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    User save(User user);

    Optional<User> findById(Long id);

    List<User> findAll();

    void deleteById(Long id);

    User update(Long id, User user);

    User login(User user, String ipAddress);
}