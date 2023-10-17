package com.naturepic.home.service;

import com.naturepic.home.model.CategoryDto;

import java.util.Set;

public interface ICategoryService {

    void newCategory(CategoryDto categoryDto);

    CategoryDto findCategoryById(Long id);

    boolean deleteCategory(Long id);

    Set<CategoryDto> listAllCategories();

}
