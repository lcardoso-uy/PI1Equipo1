package com.naturepic.home.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.naturepic.home.model.ProductImageDto;
import com.naturepic.home.model.entity.Product;
import com.naturepic.home.model.entity.ProductImage;
import com.naturepic.home.model.repository.ProductImageRepository;
import com.naturepic.home.model.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductImageService implements IProductImageService{

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductRepository productRepository;


    @Autowired
    ObjectMapper mapper;


    @Override
    public ProductImageDto findProductImageById(Long imageId) {
        Optional<ProductImage> productImage = productImageRepository.findById(imageId);
        return productImage.map(img -> mapper.convertValue(img, ProductImageDto.class)).orElse(null);
    }

    @Override
    public Set<ProductImageDto> findProductImagesByProductId(Long productId) {
        List<ProductImage> productImages = productImageRepository.findAllByProductId(productId);
        return productImages.stream().map(img -> mapper.convertValue(img, ProductImageDto.class)).collect(Collectors.toSet());
    }

    @Override
    public void addProductImage(ProductImageDto productImageDto) {

        // Fetch the product by ID
        Product product = productRepository.findById(productImageDto.getProductid())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + productImageDto.getProductid()));

        // Convert the DTO to an entity
        ProductImage productImage = mapper.convertValue(productImageDto, ProductImage.class);

        // Associate the product with the image
        productImage.setProduct(product);

        // Save the image entity to the database
        productImageRepository.save(productImage);
    }


    @Override
    public Set<ProductImageDto> listAllProductImages() {
        List<ProductImage> productImages = productImageRepository.findAll();
        return productImages.stream().map(img -> mapper.convertValue(img, ProductImageDto.class)).collect(Collectors.toSet());
    }

    public boolean deleteProductImage(Long id) {
        try {
            productImageRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            // TODO: log the error
            return false;
        }
    }

}
