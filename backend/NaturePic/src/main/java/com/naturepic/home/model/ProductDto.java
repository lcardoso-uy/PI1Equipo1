package com.naturepic.home.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class ProductDto {

    private Long id;
    private String name;
    private String description;
    private Boolean status;
    private CategoryDto category;
    private List<ProductImageDto> images;
}
