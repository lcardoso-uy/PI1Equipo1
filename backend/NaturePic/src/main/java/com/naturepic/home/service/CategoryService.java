package com.naturepic.home.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.naturepic.home.model.CategoryDto;
import com.naturepic.home.model.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class CategoryService implements ICategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public void newCategory(CategoryDto categoryDto) {

    }

    @Override
    public CategoryDto findCategoryById(Long id) {
        return null;
    }

    @Override
    public boolean deleteCategory(Long id) {
        return false;
    }

    @Override
    public Set<CategoryDto> listAllCategories() {
        return null;
    }
}
