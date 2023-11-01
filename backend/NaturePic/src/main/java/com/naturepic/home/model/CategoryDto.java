package com.naturepic.home.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class CategoryDto {

    private Long id;

    private String name;
    private Boolean status;

    @JsonProperty("image_url")
    @Column(name = "image_url")
    private String imageUrl;  /*si seteo imageUrl en camelCase, a la base va como image_url, pero luego, no funcionan bien las actualizacoines del campo*/
}
