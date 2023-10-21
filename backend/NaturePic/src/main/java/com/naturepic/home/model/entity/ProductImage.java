package com.naturepic.home.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageid;

    private String imageurl;

    @ManyToOne
    @JoinColumn(name = "productid")
    private Product product;

}
