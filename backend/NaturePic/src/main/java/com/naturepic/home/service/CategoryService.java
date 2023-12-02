package com.naturepic.home.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.naturepic.home.model.CategoryDto;
import com.naturepic.home.model.ProductProjection;
import com.naturepic.home.model.entity.Category;
import com.naturepic.home.model.repository.CategoryRepository;
import com.naturepic.home.model.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CategoryService implements ICategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void newCategory(CategoryDto categoryDto) {
        Category category = mapper.convertValue(categoryDto, Category.class);
        categoryRepository.save(category);
    }


    @Override
    public CategoryDto findCategoryById(Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            return mapper.convertValue(category, CategoryDto.class);
        }
        return null;
    }

    @Override
    public boolean deleteCategory(Long id) {
        try {
            categoryRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            // TODO logger.error("Failed to delete the product with ID: " + id, e);
            return false;
        }

    }

    @Override
    public Set<CategoryDto> listAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(category -> mapper.convertValue(category, CategoryDto.class))
                .collect(Collectors.toSet());
    }

    @Override
    public List<ProductProjection> getProductsByCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category != null) {
            List<ProductProjection> products = productRepository.findByCategory(category);
            return products;
/*
                    products.stream().map(product -> mapper.convertValue(product, ProductDto.class))
                    .collect(Collectors.toSet());
*/
        }
        return null;
    }



}
