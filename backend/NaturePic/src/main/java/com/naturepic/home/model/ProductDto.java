package com.naturepic.home.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@NoArgsConstructor
public class ProductDto {

    private Long id;
    private String name;
    private String description;
    private Boolean status;
    private CategoryDto category;

    @JsonProperty("image_url")
    @Column(name = "image_url")
    private String imageUrl;

    private List<ProductImageDto> images;
}
