package com.naturepic.home.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter

public class ProductImageDto {

    @JsonProperty("image_id")
    @Column(name = "image_id")
    private Long imageId;

    @JsonProperty("image_url")
    @Column(name = "image_url")
    private String imageUrl;
    // If you need a reference back to the product, just use the product ID

    @JsonProperty("product_id")
    @JoinColumn(name = "product_id")
    private Long productId;

}
