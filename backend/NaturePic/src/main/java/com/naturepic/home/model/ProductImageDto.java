package com.naturepic.home.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter

public class ProductImageDto {

    private Long imageid;
    private String imageurl;
    // If you need a reference back to the product, just use the product ID
    private Long productid;

}
