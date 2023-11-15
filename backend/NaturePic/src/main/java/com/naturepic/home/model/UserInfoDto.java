package com.naturepic.home.model;

import com.naturepic.home.model.entity.UserInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserInfoDto {
    private String username;
    private String firstname;
    private String surname;
    private String email;
    private String roles;
    private boolean isAdmin;

    // Método para convertir de entidad a DTO
    public static UserInfoDto fromEntity(UserInfo userInfo) {
        return new UserInfoDto(
                (String) userInfo.getUsername(),
                userInfo.getFirstname(),
                userInfo.getSurname(),
                userInfo.getEmail(),
                userInfo.getRoles(),
                userInfo.getRoles() != null && userInfo.getRoles().contains("ROLE_ADMIN")
        );
    }
}
