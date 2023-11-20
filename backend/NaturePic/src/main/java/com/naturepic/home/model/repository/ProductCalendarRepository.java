package com.naturepic.home.model.repository;

import com.naturepic.home.model.entity.ProductCalendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductCalendarRepository extends JpaRepository<ProductCalendar, Long> {
    List<ProductCalendar> findByProductIdAndDateBetween(Long productId, LocalDate startDate, LocalDate endDate);
    List<ProductCalendar> findByProductNameContainingAndDateBetween(String name, LocalDate startDate, LocalDate endDate);

    @Query("SELECT DISTINCT pc.product.id FROM ProductCalendar pc WHERE LOWER(pc.product.name) LIKE LOWER(CONCAT('%', :name, '%')) AND pc.date BETWEEN :startDate AND :endDate")
    List<Long> findProductIdsByNameContainingIgnoreCaseAndDateBetween(@Param("name") String name, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT pc FROM ProductCalendar pc WHERE pc.product.id IN :productIds AND pc.date BETWEEN :startDate AND :endDate")
    List<ProductCalendar> findByProductIdsAndDateBetween(@Param("productIds") List<Long> productIds, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
