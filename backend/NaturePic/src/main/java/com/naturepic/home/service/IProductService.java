package com.naturepic.home.service;

import com.naturepic.home.model.ProductDto;

import java.util.Set;

public interface IProductService {

    void newProduct(ProductDto productDto);

    ProductDto findProductById(Long id);

    boolean deleteProduct(Long id);

    Set<ProductDto> listAllProducts();

}
