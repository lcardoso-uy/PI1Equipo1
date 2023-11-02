package com.naturepic.home.model.dto;  // cambio en el nombre del paquete

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class UserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    @JsonIgnore   // No exponer el password cuando se envía desde el backend
    private String password;

    private Boolean isAdmin;
}
