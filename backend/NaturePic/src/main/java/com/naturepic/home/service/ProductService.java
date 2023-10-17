package com.naturepic.home.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.naturepic.home.model.ProductDto;
import com.naturepic.home.model.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ProductService implements IProductService{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public void newProduct(ProductDto productDto) {

    }

    @Override
    public ProductDto findProductById(Long id) {
        return null;
    }

    @Override
    public boolean deleteProduct(Long id) {
        return false;
    }

    @Override
    public Set<ProductDto> listAllProducts() {
        return null;
    }
}
