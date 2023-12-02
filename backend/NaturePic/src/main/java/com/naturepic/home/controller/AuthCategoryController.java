package com.naturepic.home.controller;

import com.naturepic.home.model.CategoryDto;
import com.naturepic.home.model.ProductProjection;
import com.naturepic.home.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/authcategories")
public class AuthCategoryController {

    private ICategoryService categoryService;

    @Autowired
    public void CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/admin/resource")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> newCategory(@RequestBody CategoryDto categoryDto){
        categoryService.newCategory(categoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Categoría creada exitosamente.");
    }

    @GetMapping
    public ResponseEntity<Set<CategoryDto>> listAllCategories() {
        return ResponseEntity.ok(categoryService.listAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long id) {
        CategoryDto categoryDto = categoryService.findCategoryById(id);
        if (categoryDto != null) {
            return ResponseEntity.ok(categoryDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/admin/resource/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        boolean deleted = categoryService.deleteCategory(id);
        if (deleted) {
            return ResponseEntity.ok("Categoría eliminada exitosamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoría no encontrada");
        }
    }

    @GetMapping("/{id}/products")
    public ResponseEntity<List<ProductProjection>> getProductsByCategory(@PathVariable Long id) {
        List<ProductProjection> products = categoryService.getProductsByCategory(id);
        if (products != null) {
            return ResponseEntity.ok(products);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}
