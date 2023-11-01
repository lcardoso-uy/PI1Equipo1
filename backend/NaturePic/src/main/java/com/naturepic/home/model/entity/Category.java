package com.naturepic.home.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Boolean status;

    @JsonProperty("image_url")
    @Column(name = "image_url")
    private String imageUrl;  /*si seteo imageUrl en camelCase, a la base va como image_url, pero luego, no funcionan bien las actualizacoines del campo*/
}
