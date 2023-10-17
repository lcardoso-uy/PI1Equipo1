package com.naturepic.home.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Product {

    @Id
    private Long id;

    private String name;
    private String description;
    private Boolean status;

    @ManyToOne
    private Category category;

    public Product(Long id, String name, String description, Boolean status, Category category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.category = category;
    }
}
