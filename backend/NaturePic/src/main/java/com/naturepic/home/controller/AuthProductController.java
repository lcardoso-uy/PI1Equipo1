package com.naturepic.home.controller;

import com.naturepic.home.model.ProductDto;
import com.naturepic.home.model.entity.Product;
import com.naturepic.home.service.IProductService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/authproducts")
public class AuthProductController {

    private Logger logger = Logger.getLogger(ProductController.class);
    private IProductService productService;

    @Autowired
    public void ProductController(IProductService productService) {
        this.productService = productService;
    }

    @Autowired
    public AuthProductController(IProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/admin/resource")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> newProduct(@RequestBody ProductDto productDto){
        try {
            logger.debug("new product.Dto:" + productDto.getId() + "-" + productDto.getName() + "-" + productDto.getImageUrl());
            productService.newProduct(productDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Producto creado exitosamente.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Set<ProductDto>> listAllProducts() {
        return ResponseEntity.ok(productService.listAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        ProductDto productDto = productService.findProductById(id);
        if (productDto != null) {
            return ResponseEntity.ok(productDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/random")
    public ResponseEntity<List<Product>> getRandomProducts() {
        return ResponseEntity.ok(productService.findRandomProducts());
    }

    @DeleteMapping("/admin/resource/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        boolean deleted = productService.deleteProduct(id);
        if (deleted) {
            return ResponseEntity.ok("Producto eliminado exitosamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado.");
        }
    }

    @PatchMapping("/admin/resource/{productId}/category/{categoryId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> associateCategoryToProduct(@PathVariable Long productId, @PathVariable Long categoryId){
        try {

            productService.associateCategoryToProduct(productId, categoryId);
            return ResponseEntity.ok("Categoría asociada exitosamente al producto.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/admin/resource/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto){
        try {
            productService.updateProduct(id, productDto);
            return ResponseEntity.ok("Producto actualizado exitosamente.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDto>> searchProductsByNameWithText(@RequestParam String name) {
        List<ProductDto> products = productService.searchProductsByNameWithText(name);
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(products);
        }
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

}

