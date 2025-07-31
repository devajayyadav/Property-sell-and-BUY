package com.rapidfacto.rapidfacto.dto;

import com.rapidfacto.rapidfacto.Property;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PropertyMapper {

    public PropertyResponseDto toResponseDto(Property property) {
        PropertyResponseDto dto = new PropertyResponseDto();
        dto.setId(property.getId());
        dto.setTitle(property.getTitle());
        dto.setLocation(property.getLocation());
        dto.setPrice(property.getPrice());
        dto.setImageUrl(property.getImageUrl());
        dto.setDescription(property.getDescription());
        dto.setCreatedAt(property.getCreatedAt());
        dto.setUpdatedAt(property.getUpdatedAt());
        return dto;
    }

    public Property toEntity(PropertyRequestDto dto) {
        Property property = new Property();
        property.setTitle(dto.getTitle());
        property.setLocation(dto.getLocation());
        property.setPrice(dto.getPrice());
        property.setImageUrl(dto.getImageUrl());
        property.setDescription(dto.getDescription());
        return property;
    }

    public List<PropertyResponseDto> toResponseDtoList(List<Property> properties) {
        return properties.stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    public void updateEntityFromDto(Property property, PropertyRequestDto dto) {
        property.setTitle(dto.getTitle());
        property.setLocation(dto.getLocation());
        property.setPrice(dto.getPrice());
        property.setImageUrl(dto.getImageUrl());
        property.setDescription(dto.getDescription());
    }
} 