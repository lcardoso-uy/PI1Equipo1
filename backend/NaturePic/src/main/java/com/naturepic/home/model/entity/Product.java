package com.naturepic.home.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.util.List;

@Entity
public class Product {

    @Id
    private Long id;

    private String name;
    private String description;
    private Boolean status;

    @ManyToOne
    private Category category;

    private List<String> images;


}
