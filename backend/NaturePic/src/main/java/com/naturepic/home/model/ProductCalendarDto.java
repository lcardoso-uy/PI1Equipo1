package com.naturepic.home.model;

import com.naturepic.home.model.entity.ProductStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ProductCalendarDto {
    private Long productId;
    private LocalDate date;
    private ProductStatus status;

}
