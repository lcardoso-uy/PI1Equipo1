package com.naturepic.home.model.repository;

import com.naturepic.home.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);
    @Query(value = "SELECT * FROM Product ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Product> findRandomProducts();

}

