package com.naturepic.home.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Boolean status;
    private String imageurl;  /*si seteo imageUrl en camelCase, a la base va como image_url, pero luego, no funcionan bien las actualizacoines del campo*/
}
