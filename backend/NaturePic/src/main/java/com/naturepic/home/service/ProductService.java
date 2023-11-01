package com.naturepic.home.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.naturepic.home.model.ProductDto;
import com.naturepic.home.model.entity.Product;
import com.naturepic.home.model.repository.ProductRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductService implements IProductService {

    private Logger logger = Logger.getLogger(ProductService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public void newProduct(ProductDto productDto) {

        logger.debug("newProduct :: Inicio");
        logger.debug("product.Dto:" + productDto.getId() + "-" + productDto.getName() + "-" + productDto.getImageUrl());

        Product existingProduct = productRepository.findByName(productDto.getName()).orElse(null);

        //logger.debug("existingProduct:" + existingProduct.getId() + "-" + existingProduct.getName() + "-" + existingProduct.getImageUrl());

        if (existingProduct != null) {
            throw new IllegalArgumentException("El producto con el nombre " + productDto.getName() + " ya existe!");
        }

        logger.debug("save product.Dto:" + productDto.getId() + "-" + productDto.getName() + "-" + productDto.getImageUrl());
        saveProduct(productDto);
    }

    @Override
    public ProductDto findProductById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            return mapper.convertValue(product, ProductDto.class);
        }
        return null;
    }

    @Override
    public ProductDto findProductByName(String name) {
        Product product = productRepository.findByName(name).orElse(null);
        if (product != null) {
            return mapper.convertValue(product, ProductDto.class);
        }
        return null;
    }

    public List<Product> findRandomProducts() {
        return productRepository.findRandomProducts();
    }

    @Override
    public boolean deleteProduct(Long id) {
        try {
            productRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            // TODO logger.error("Failed to delete the product with ID: " + id, e);
            return false;
        }
    }

    @Override
    public Set<ProductDto> listAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> mapper.convertValue(product, ProductDto.class))
                .collect(Collectors.toSet());
    }

    private void saveProduct(ProductDto productDto) {


        Product newProduct = mapper.convertValue(productDto, Product.class);
        productRepository.save(newProduct);
    }
}
