package com.naturepic.home.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class CategoryDto {

    private Long id;

    private String name;
    private Boolean status;

    private String imageurl;  /*si seteo imageUrl en camelCase, a la base va como image_url, pero luego, no funcionan bien las actualizacoines del campo*/
}
