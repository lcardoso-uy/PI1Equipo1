package com.naturepic.home.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.naturepic.home.model.entity.Category;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class ProductDto {

    private Long id;
    private String name, description;
    private Boolean status;
    private Category category;
    private List<String> images;

}
