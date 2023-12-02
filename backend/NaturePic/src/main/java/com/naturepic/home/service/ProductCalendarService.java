package com.naturepic.home.service;

import com.naturepic.home.model.CategoryDto;
import com.naturepic.home.model.ProductCalendarDto;
import com.naturepic.home.model.ProductDto;
import com.naturepic.home.model.entity.Product;
import com.naturepic.home.model.entity.ProductCalendar;
import com.naturepic.home.model.entity.ProductStatus;
import com.naturepic.home.model.repository.ProductCalendarRepository;
import com.naturepic.home.model.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductCalendarService implements IProductCalendarService {

    @Autowired
    private ProductCalendarRepository productCalendarRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductDto> getAvailableProducts(String text, LocalDate start, LocalDate end) {
        List<Long> productIds = productCalendarRepository.findProductIdsByNameContainingIgnoreCaseAndDateBetween(text, start, end);

        if (productIds.isEmpty()) {
            return new ArrayList<>();
        }

        // Puedes optar por devolver detalles completos del producto o solo algunos campos
        return productRepository.findAllById(productIds).stream()
                .map(this::convertToProductDto)
                .collect(Collectors.toList());
    }


    @Override
    public List<ProductCalendarDto> getProductCalendar(Long productId, LocalDate start, LocalDate end) {
        List<ProductCalendar> productCalendars = productCalendarRepository.findByProductIdAndDateBetween(productId, start, end);

        // Convierte la lista de entidades a DTOs
        return productCalendars.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

/*
    public ResponseEntity<List<ProductCalendarDto>> getProductCalendar(Long productId, LocalDate start, LocalDate end) {
        List<ProductCalendar> productCalendars = productCalendarRepository.findByProductIdAndDateBetween(productId, start, end);

        // Convierte la lista de entidades a DTOs
        List<ProductCalendarDto> productCalendarDtos = productCalendars.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(productCalendarDtos);
    }
*/

    @Override
    public List<ProductCalendarDto> createProductCalendar(Long productId, LocalDate startDate, LocalDate endDate) throws Exception {
        // Validación: Verifica si el producto existe
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new Exception("Producto no encontrado con ID: " + productId));

        // Validación: Fecha de inicio debe ser menor o igual a la fecha de fin
        if (startDate.isAfter(endDate)) {
            throw new Exception("La fecha de inicio debe ser menor o igual a la fecha de fin");
        }

        // Validación: Verifica si ya existe un calendario para ese rango de fechas
        List<ProductCalendar> existingCalendars = productCalendarRepository
                .findByProductIdAndDateBetween(productId, startDate, endDate);
        if (!existingCalendars.isEmpty()) {
            throw new Exception("Ya existe un calendario para el rango de fechas especificado");
        }

        // Creación de calendarios para cada día en el rango
        List<ProductCalendar> calendars = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            ProductCalendar calendar = new ProductCalendar();
            calendar.setProduct(product);
            calendar.setDate(date);
            calendar.setStatus( ProductStatus.DISPONIBLE);
            calendars.add(calendar);
        }
        productCalendarRepository.saveAll(calendars);

        // Convertir a DTOs y devolver
        return calendars.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ProductCalendarDto convertToDto(ProductCalendar productCalendar) {
        ProductCalendarDto dto = new ProductCalendarDto();
        dto.setProductId(productCalendar.getProduct().getId());
        dto.setDate(productCalendar.getDate());
        dto.setStatus(productCalendar.getStatus());
        return dto;
    }

    private ProductDto convertToProductDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setStatus(product.getStatus());
        dto.setImageUrl(product.getImageUrl());

        // Convertir la categoría si no es nula
        if (product.getCategory() != null) {
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setId(product.getCategory().getId());
            categoryDto.setName(product.getCategory().getName());
            dto.setCategory(categoryDto);
        }
        return dto;

    }

    @Override
    public void validateDateRange(LocalDate startDate, LocalDate endDate) throws Exception {
        if (startDate.isAfter(endDate)) {
            throw new Exception("La fecha de inicio debe ser menor o igual a la fecha de fin");
        }

    }

}