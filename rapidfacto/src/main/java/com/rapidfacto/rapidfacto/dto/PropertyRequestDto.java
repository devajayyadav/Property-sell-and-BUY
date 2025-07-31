package com.rapidfacto.rapidfacto.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PropertyRequestDto {
    
    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 100, message = "Title must be between 5 and 100 characters")
    private String title;
    
    @NotBlank(message = "Location is required")
    @Size(min = 3, max = 100, message = "Location must be between 3 and 100 characters")
    private String location;
    
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    @DecimalMin(value = "100000.0", message = "Price must be at least 100,000")
    @DecimalMax(value = "100000000.0", message = "Price cannot exceed 100,000,000")
    private Double price;
    
    @NotBlank(message = "Image URL is required")
    @Pattern(regexp = "^(https?://).*", message = "Image URL must be a valid HTTP/HTTPS URL")
    @Size(max = 500, message = "Image URL cannot exceed 500 characters")
    private String imageUrl;
    
    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;
} 