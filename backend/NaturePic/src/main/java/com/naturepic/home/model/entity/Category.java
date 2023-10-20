package com.naturepic.home.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Category {
    @Id
    private Long id;

    private String name;
    private Boolean status;
    private String imageurl;
}
