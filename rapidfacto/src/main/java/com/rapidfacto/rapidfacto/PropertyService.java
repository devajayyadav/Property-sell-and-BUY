package com.rapidfacto.rapidfacto;

import com.rapidfacto.rapidfacto.dto.PropertyRequestDto;
import com.rapidfacto.rapidfacto.dto.PropertyResponseDto;
import com.rapidfacto.rapidfacto.dto.PropertyMapper;
import com.rapidfacto.rapidfacto.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import java.util.List;

@Service
@Transactional
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private PropertyMapper propertyMapper;

    // Initialize sample data when application starts
    @PostConstruct
    public void initializeData() {
        if (propertyRepository.count() == 0) {
            // Sample property data with working image URLs
            Property[] properties = {
                createSampleProperty("2 BHK Apartment in Mumbai", "Andheri East, Mumbai", 8500000.0, 
                    "https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg", 
                    "Spacious 2-bedroom apartment with balcony and great sunlight."),
                
                createSampleProperty("1 BHK Studio in Bangalore", "Whitefield, Bangalore", 4500000.0, 
                    "https://cdn.pixabay.com/photo/2020/10/04/13/22/living-room-5623029_1280.jpg", 
                    "Cozy and affordable studio apartment ideal for professionals."),
                
                createSampleProperty("3 BHK Flat in Delhi", "Rohini Sector 9, Delhi", 9500000.0, 
                    "https://cdn.pixabay.com/photo/2018/05/09/21/38/interior-3389676_1280.jpg", 
                    "Premium 3-bedroom flat near metro station."),
                
                createSampleProperty("2 BHK Apartment in Pune", "Hinjewadi, Pune", 6700000.0, 
                    "https://cdn.pixabay.com/photo/2016/11/18/16/16/interior-1835352_1280.jpg", 
                    "Modern home with gated society and gym access."),
                
                createSampleProperty("1 RK Room in Noida", "Sector 62, Noida", 3200000.0, 
                    "https://cdn.pixabay.com/photo/2020/03/26/17/32/room-4976931_1280.jpg", 
                    "Compact room suitable for students or working individuals."),
                
                createSampleProperty("4 BHK Villa in Gurgaon", "DLF Phase 3, Gurgaon", 18000000.0, 
                    "https://cdn.pixabay.com/photo/2015/01/28/23/35/house-615619_1280.jpg", 
                    "Luxurious villa with private garden and parking."),
                
                createSampleProperty("2 BHK Apartment in Jaipur", "Malviya Nagar, Jaipur", 5200000.0, 
                    "https://cdn.pixabay.com/photo/2017/08/06/11/40/people-2595685_1280.jpg", 
                    "Well-furnished apartment near parks and schools."),
                
                createSampleProperty("3 BHK in Ahmedabad", "Satellite, Ahmedabad", 8800000.0, 
                    "https://cdn.pixabay.com/photo/2020/10/24/02/10/living-room-5687332_1280.jpg", 
                    "Spacious and well-connected residential property."),
                
                createSampleProperty("1 BHK in Lucknow", "Gomti Nagar, Lucknow", 4000000.0, 
                    "https://cdn.pixabay.com/photo/2016/10/13/09/06/living-room-1738317_1280.jpg", 
                    "Budget-friendly housing option in a prime area."),
                
                createSampleProperty("2 BHK Apartment in Bhopal", "MP Nagar, Bhopal", 5500000.0, 
                    "https://cdn.pixabay.com/photo/2020/04/16/18/05/sofa-5051276_1280.jpg", 
                    "Peaceful society with nearby amenities and public transport.")
            };

            for (Property property : properties) {
                propertyRepository.save(property);
            }
            System.out.println("Sample property data initialized successfully!");
        }
    }

    private Property createSampleProperty(String title, String location, Double price, String imageUrl, String description) {
        Property property = new Property();
        property.setTitle(title);
        property.setLocation(location);
        property.setPrice(price);
        property.setImageUrl(imageUrl);
        property.setDescription(description);
        return property;
    }

    // Get all properties
    public List<PropertyResponseDto> getAllProperties() {
        List<Property> properties = propertyRepository.findAll();
        return propertyMapper.toResponseDtoList(properties);
    }

    // Get property by ID
    public PropertyResponseDto getPropertyById(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property", "id", id));
        return propertyMapper.toResponseDto(property);
    }

    // Save a new property
    public PropertyResponseDto saveProperty(PropertyRequestDto propertyRequestDto) {
        Property property = propertyMapper.toEntity(propertyRequestDto);
        Property savedProperty = propertyRepository.save(property);
        return propertyMapper.toResponseDto(savedProperty);
    }

    // Update an existing property
    public PropertyResponseDto updateProperty(Long id, PropertyRequestDto propertyRequestDto) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property", "id", id));
        
        propertyMapper.updateEntityFromDto(property, propertyRequestDto);
        Property updatedProperty = propertyRepository.save(property);
        return propertyMapper.toResponseDto(updatedProperty);
    }

    // Delete a property
    public void deleteProperty(Long id) {
        if (!propertyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Property", "id", id);
        }
        propertyRepository.deleteById(id);
    }

    // Search properties by location
    public List<PropertyResponseDto> searchByLocation(String location) {
        List<Property> properties = propertyRepository.findByLocationContainingIgnoreCase(location);
        return propertyMapper.toResponseDtoList(properties);
    }

    // Search properties by price range
    public List<PropertyResponseDto> searchByPriceRange(Double minPrice, Double maxPrice) {
        List<Property> properties = propertyRepository.findByPriceBetween(minPrice, maxPrice);
        return propertyMapper.toResponseDtoList(properties);
    }

    // Search properties by title
    public List<PropertyResponseDto> searchByTitle(String title) {
        List<Property> properties = propertyRepository.findByTitleContainingIgnoreCase(title);
        return propertyMapper.toResponseDtoList(properties);
    }

    // Get properties sorted by price (ascending)
    public List<PropertyResponseDto> getPropertiesByPriceAsc() {
        List<Property> properties = propertyRepository.findAllByOrderByPriceAsc();
        return propertyMapper.toResponseDtoList(properties);
    }

    // Get properties sorted by price (descending)
    public List<PropertyResponseDto> getPropertiesByPriceDesc() {
        List<Property> properties = propertyRepository.findAllByOrderByPriceDesc();
        return propertyMapper.toResponseDtoList(properties);
    }
} 