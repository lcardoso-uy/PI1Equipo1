package com.naturepic.home.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String name;

    private String firstname;
    private String surname;
    private String email;
    private String password;
    private String roles;

    public boolean isAdmin() {
        return this.roles != null && this.roles.contains("ROLE_ADMIN");
    }

    public Object getUsername() {
        return this.name;
    }
}
