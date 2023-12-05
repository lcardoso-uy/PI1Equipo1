package com.naturepic.home.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    @NotBlank(message = "El nombre de usuario no puede estar vacío")
    private String name;

    private String firstname;
    private String surname;
    private String email;
    private String password;
    private String roles;

    @JsonIgnore
    @OneToMany(mappedBy = "userInfo")
    private Collection<Booking> bookings;


    public boolean isAdmin() {
        return this.roles != null && this.roles.contains("ROLE_ADMIN");
    }

    public String getUsername() {
        return this.name;
    }

    public Collection<Booking> getBookings() {
        return bookings;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
