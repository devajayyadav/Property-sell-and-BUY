package com.rapidfacto.rapidfacto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    
    // Find properties by location
    List<Property> findByLocationContainingIgnoreCase(String location);
    
    // Find properties by price range
    List<Property> findByPriceBetween(Double minPrice, Double maxPrice);
    
    // Find properties by title containing keyword
    List<Property> findByTitleContainingIgnoreCase(String title);
    
    // Find properties sorted by price (ascending)
    List<Property> findAllByOrderByPriceAsc();
    
    // Find properties sorted by price (descending)
    List<Property> findAllByOrderByPriceDesc();
} 