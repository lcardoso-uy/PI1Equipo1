package com.naturepic.home.service;

import com.naturepic.home.model.ProductImageDto;

import java.util.Set;

public interface IProductImageService {

    void addProductImage(ProductImageDto productImageDto);

    ProductImageDto findProductImageById(Long imageId);

    boolean deleteProductImage(Long imageId);

    Set<ProductImageDto> listAllProductImages();

    Set<ProductImageDto> findProductImagesByProductId(Long productId);


}
