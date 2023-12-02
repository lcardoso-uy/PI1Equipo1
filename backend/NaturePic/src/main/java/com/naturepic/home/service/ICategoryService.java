package com.naturepic.home.service;

import com.naturepic.home.model.CategoryDto;
import com.naturepic.home.model.ProductProjection;

import java.util.List;
import java.util.Set;

public interface ICategoryService {

    void newCategory(CategoryDto categoryDto);

    CategoryDto findCategoryById(Long id);

    boolean deleteCategory(Long id);

    Set<CategoryDto> listAllCategories();

    List<ProductProjection> getProductsByCategory(Long categoryId);


}
