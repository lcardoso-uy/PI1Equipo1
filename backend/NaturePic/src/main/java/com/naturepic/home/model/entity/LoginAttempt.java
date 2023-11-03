package com.naturepic.home.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class LoginAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email; // Email que intentó iniciar sesión.
    private LocalDateTime attemptTime; // Fecha y hora del intento.
    private Boolean wasSuccessful; // Si el intento fue exitoso o no.
    private String ipAddress; // Dirección IP desde donde se intentó el inicio de sesión.


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    // Constructor, getters, setters...
}
