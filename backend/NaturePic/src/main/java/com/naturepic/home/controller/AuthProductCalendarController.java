package com.naturepic.home.controller;

import com.naturepic.home.model.ProductCalendarDto;
import com.naturepic.home.model.ProductDto;
import com.naturepic.home.model.entity.Product;
import com.naturepic.home.model.repository.ProductRepository;
import com.naturepic.home.service.IProductCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/product-calendar")
public class AuthProductCalendarController {

    @Autowired
    private IProductCalendarService productCalendarService;

    @Autowired
    private ProductRepository productRepository;

    // Método para crear un calendario de producto
    @PostMapping("/create/{productId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createProductCalendar(@PathVariable Long productId,
                                                   @RequestParam LocalDate startDate,
                                                   @RequestParam LocalDate endDate) {
        try {
            List<ProductCalendarDto> createdCalendars = productCalendarService.createProductCalendar(productId, startDate, endDate);
            return ResponseEntity.ok(createdCalendars);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Método para obtener productos disponibles
    @GetMapping("/available")
    public ResponseEntity<List<ProductDto>> getAvailableProducts(
            @RequestParam String text,
            @RequestParam LocalDate start,
            @RequestParam LocalDate end) {
        List<ProductDto> availableProducts = productCalendarService.getAvailableProducts(text, start, end);
        return ResponseEntity.ok(availableProducts);
    }

    // Método para obtener el calendario de un producto
    @GetMapping("/calendar/{productId}")
    public ResponseEntity<?> getProductCalendar(
            @PathVariable Long productId,
            @RequestParam LocalDate start,
            @RequestParam LocalDate end) {
        try {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new Exception("Producto no encontrado con ID: " + productId));

            if (start.isAfter(end)) {
                throw new Exception("La fecha de inicio debe ser menor o igual a la fecha de fin");
            }

            List<ProductCalendarDto> productCalendar = productCalendarService.getProductCalendar(productId, start, end);
            return ResponseEntity.ok(productCalendar);
        } catch (Exception e) {
            // Devuelve un mensaje de error dentro de un ResponseEntity genérico
            return ResponseEntity.badRequest().body( Collections.singletonMap("error", e.getMessage()));
        }
    }
}
