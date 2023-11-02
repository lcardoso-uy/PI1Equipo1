package com.naturepic.home.service;

import com.naturepic.home.model.entity.User;
import com.naturepic.home.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User update(Long id, User user) {
        if(userRepository.existsById(id)) {
            user.setId(id);
            return userRepository.save(user);
        }
        // Aquí puedes manejar la lógica en caso de que el usuario no exista.
        return null;
    }
}