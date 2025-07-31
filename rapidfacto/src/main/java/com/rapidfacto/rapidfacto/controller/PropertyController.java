package com.rapidfacto.rapidfacto.controller;

import com.rapidfacto.rapidfacto.dto.ApiResponse;
import com.rapidfacto.rapidfacto.dto.PropertyRequestDto;
import com.rapidfacto.rapidfacto.dto.PropertyResponseDto;
import com.rapidfacto.rapidfacto.PropertyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    // Get all properties
    @GetMapping
    public ResponseEntity<ApiResponse<List<PropertyResponseDto>>> getAllProperties() {
        List<PropertyResponseDto> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(ApiResponse.success(properties, "Properties retrieved successfully"));
    }

    // Get property by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PropertyResponseDto>> getPropertyById(@PathVariable Long id) {
        PropertyResponseDto property = propertyService.getPropertyById(id);
        return ResponseEntity.ok(ApiResponse.success(property, "Property retrieved successfully"));
    }

    // Create a new property
    @PostMapping
    public ResponseEntity<ApiResponse<PropertyResponseDto>> createProperty(@Valid @RequestBody PropertyRequestDto propertyRequestDto) {
        PropertyResponseDto savedProperty = propertyService.saveProperty(propertyRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(savedProperty, "Property created successfully"));
    }

    // Update an existing property
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PropertyResponseDto>> updateProperty(@PathVariable Long id, @Valid @RequestBody PropertyRequestDto propertyRequestDto) {
        PropertyResponseDto updatedProperty = propertyService.updateProperty(id, propertyRequestDto);
        return ResponseEntity.ok(ApiResponse.success(updatedProperty, "Property updated successfully"));
    }

    // Delete a property
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Property deleted successfully"));
    }

    // Search properties by location
    @GetMapping("/search/location")
    public ResponseEntity<ApiResponse<List<PropertyResponseDto>>> searchByLocation(@RequestParam String location) {
        List<PropertyResponseDto> properties = propertyService.searchByLocation(location);
        return ResponseEntity.ok(ApiResponse.success(properties, "Properties found by location"));
    }

    // Search properties by price range
    @GetMapping("/search/price")
    public ResponseEntity<ApiResponse<List<PropertyResponseDto>>> searchByPriceRange(
            @RequestParam Double minPrice, 
            @RequestParam Double maxPrice) {
        List<PropertyResponseDto> properties = propertyService.searchByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(ApiResponse.success(properties, "Properties found by price range"));
    }

    // Search properties by title
    @GetMapping("/search/title")
    public ResponseEntity<ApiResponse<List<PropertyResponseDto>>> searchByTitle(@RequestParam String title) {
        List<PropertyResponseDto> properties = propertyService.searchByTitle(title);
        return ResponseEntity.ok(ApiResponse.success(properties, "Properties found by title"));
    }

    // Get properties sorted by price (ascending)
    @GetMapping("/sort/price-asc")
    public ResponseEntity<ApiResponse<List<PropertyResponseDto>>> getPropertiesByPriceAsc() {
        List<PropertyResponseDto> properties = propertyService.getPropertiesByPriceAsc();
        return ResponseEntity.ok(ApiResponse.success(properties, "Properties sorted by price (ascending)"));
    }

    // Get properties sorted by price (descending)
    @GetMapping("/sort/price-desc")
    public ResponseEntity<ApiResponse<List<PropertyResponseDto>>> getPropertiesByPriceDesc() {
        List<PropertyResponseDto> properties = propertyService.getPropertiesByPriceDesc();
        return ResponseEntity.ok(ApiResponse.success(properties, "Properties sorted by price (descending)"));
    }
}
