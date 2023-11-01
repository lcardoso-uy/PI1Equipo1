package com.naturepic.home.service;

import com.naturepic.home.model.ProductDto;
import com.naturepic.home.model.entity.Product;

import java.util.List;
import java.util.Set;

public interface IProductService {

    void newProduct(ProductDto productDto);

    ProductDto findProductById(Long id);

    ProductDto findProductByName(String name);

    boolean deleteProduct(Long id);

    Set<ProductDto> listAllProducts();

    List<Product> findRandomProducts();

    void associateCategoryToProduct(Long productId, Long categoryId);
    void updateProduct(Long productId, ProductDto productDto);
}
