package com.rapidfacto.rapidfacto.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PropertyResponseDto {
    private Long id;
    private String title;
    private String location;
    private Double price;
    private String imageUrl;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 