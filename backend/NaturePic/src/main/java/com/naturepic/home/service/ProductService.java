package com.naturepic.home.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.naturepic.home.model.ProductDto;
import com.naturepic.home.model.entity.Product;
import com.naturepic.home.model.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductService implements IProductService{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public void newProduct(ProductDto productDto) { saveProduct( productDto );  }

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


    private void saveProduct(ProductDto productDto){
        Product newProduct = mapper.convertValue(productDto, Product.class);
        productRepository.save(newProduct);
    }


}
