package com.naturepic.home.controller;

import com.naturepic.home.model.UserDto;
import com.naturepic.home.model.entity.User;
import com.naturepic.home.security.PasswordChangeDto;
import com.naturepic.home.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto userDto = userService.getUserById(id);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody User user) {
        // Convertir el User a UserDto antes de pasarlo al servicio
        UserDto userDto = convertToDto(user);
        UserDto createdUser = userService.createUser(userDto);
        return ResponseEntity.ok(createdUser);
    }

    // Método para convertir User a UserDto
    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword()); // Asegúrate de que la contraseña no sea nula
        userDto.setIsAdmin(user.getIsAdmin());
        return userDto;
    }
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @Valid @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/change-password")
    public ResponseEntity<UserDto> changeUserPassword(@PathVariable Long id, @RequestBody PasswordChangeDto passwordChangeDto) {
        UserDto updatedUser = userService.changeUserPassword(id, passwordChangeDto.getOldPassword(), passwordChangeDto.getNewPassword());
        return ResponseEntity.ok(updatedUser);
    }

}

