package com.naturepic.home.service;

import com.naturepic.home.model.ProductCalendarDto;
import com.naturepic.home.model.ProductDto;

import java.time.LocalDate;
import java.util.List;

public interface IProductCalendarService {
    List<ProductDto> getAvailableProducts(String text, LocalDate start, LocalDate end);
    List<ProductCalendarDto> getProductCalendar(Long productId, LocalDate start, LocalDate end);

    List<ProductCalendarDto> createProductCalendar(Long productId, LocalDate startDate, LocalDate endDate) throws Exception;
}
