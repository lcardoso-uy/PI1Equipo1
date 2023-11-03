package com.naturepic.home.service;

import com.naturepic.home.model.UserDto;
import com.naturepic.home.model.entity.User;
import com.naturepic.home.model.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Convertir una entidad User a un UserDto
    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setIsAdmin(user.getIsAdmin());
        return userDto;
    }

    // Convertir un UserDto a una entidad User
    private User convertToEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword()); // Asegúrate de codificar la contraseña aquí si es necesario
        user.setIsAdmin(userDto.getIsAdmin());
        return user;
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(/* tu excepción aquí */);
        return convertToDto(user);
    }


    public UserDto createUser(UserDto userDto) {

        if (userDto.getPassword() == null) {
            throw new IllegalArgumentException("Password cannot be null");
        }

        String encodedPassword = passwordEncoder.encode(userDto.getPassword());

        User user = convertToEntity(userDto);
        user.setPassword(encodedPassword); // Asegúrate de que la contraseña no sea nula
        return convertToDto(userRepository.save(user));
    }

    public UserDto updateUser(Long id, UserDto userDto) {
        User existingUser = userRepository.findById(id).orElseThrow(/* tu excepción aquí */);
        existingUser.setFirstName(userDto.getFirstName());
        existingUser.setLastName(userDto.getLastName());
        existingUser.setEmail(userDto.getEmail());
        existingUser.setIsAdmin(userDto.getIsAdmin());
        // No actualices la contraseña aquí a menos que se proporcione específicamente
        return convertToDto(userRepository.save(existingUser));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public UserDto changeUserPassword(Long id, String oldPassword, String newPassword) {

        if (newPassword == null || oldPassword == null) {
            throw new IllegalArgumentException("Passwords cannot be null");
        }
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));


        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }

        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        return convertToDto(userRepository.save(user));
    }



}
