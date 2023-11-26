package com.naturepic.home.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.naturepic.home.model.CategoryDto;
import com.naturepic.home.model.ProductDto;
import com.naturepic.home.model.ProductImageDto;
import com.naturepic.home.model.entity.Category;
import com.naturepic.home.model.entity.Product;
import com.naturepic.home.model.entity.ProductImage;
import com.naturepic.home.model.repository.CategoryRepository;
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

    @Autowired
    private CategoryRepository categoryRepository; // Inyectar CategoryRepository

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

    public void associateCategoryToProduct(Long productId, Long categoryId) {
        logger.debug("ProductService :: associateCategoryToProduct :: Inicio");
        logger.debug("productUd:" + productId + "-" + "- categoryId: " + categoryId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado con ID: " + productId));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada con ID: " + categoryId));

        product.setCategory(category);
        productRepository.save(product);
    }

    public void updateProduct(Long productId, ProductDto productDto) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado con ID: " + productId));

        // Actualiza los campos deseados
        existingProduct.setName(productDto.getName());
        existingProduct.setDescription(productDto.getDescription());
        existingProduct.setStatus(productDto.getStatus());
        existingProduct.setImageUrl(productDto.getImageUrl());

        // Actualizar la categoría
        if (productDto.getCategory() != null) {
            Category category = categoryRepository.findById(productDto.getCategory().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada con ID: " + productDto.getCategory().getId()));
            existingProduct.setCategory(category);
        } else {
            existingProduct.setCategory(null); // Esto permitirá establecer la categoría en null si se proporciona null
        }

        productRepository.save(existingProduct);
    }

/*    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }*/
@Override
public List<ProductDto> searchProductsByNameWithText(String name) {
    List<Product> products = productRepository.findByNameContaining(name);
    return products.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
}

 /*   private ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setStatus(product.getStatus());
        dto.setImageUrl(product.getImageUrl());

        // Convertir la categoría
        if (product.getCategory() != null) {
            dto.setCategory(convertCategoryToDto(product.getCategory()));
        }

        // Convertir las imágenes (si es necesario)

        return dto;
    }*/

    private ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setStatus(product.getStatus());
        dto.setImageUrl(product.getImageUrl());

        // Convertir la categoría
        if (product.getCategory() != null) {
            dto.setCategory(convertCategoryToDto(product.getCategory()));
        }

        // Convertir las imágenes del producto
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            List<ProductImageDto> imageDtos = product.getImages().stream()
                    .map(this::convertImageToDto)
                    .collect(Collectors.toList());
            dto.setImages(imageDtos);
        }

        return dto;
    }
    private CategoryDto convertCategoryToDto(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        categoryDto.setStatus(category.getStatus());
        categoryDto.setImageUrl(category.getImageUrl());
        return categoryDto;
    }

    private ProductImageDto convertImageToDto(ProductImage image) {
        ProductImageDto imageDto = new ProductImageDto();
        imageDto.setImageId(image.getImageId());
        imageDto.setImageUrl(image.getImageUrl());
        // Si necesitas referenciar el ID del producto
        imageDto.setProductId(image.getProduct().getId());
        return imageDto;
    }
}
