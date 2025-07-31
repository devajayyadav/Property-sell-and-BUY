# Property Listing API

A Spring Boot REST API for managing property listings with MySQL database, following MVC pattern and best practices.

## 🏗️ Architecture

- **MVC Pattern**: Model-View-Controller architecture
- **DTOs**: Data Transfer Objects for request/response
- **Validation**: Bean validation with custom error handling
- **Exception Handling**: Global exception handler
- **Database**: MySQL with JPA/Hibernate
- **Auditing**: Automatic timestamp management

## 🚀 Features

- ✅ **CRUD Operations** for properties
- ✅ **Search & Filter** by location, price range, title
- ✅ **Sorting** by price (ascending/descending)
- ✅ **Data Validation** with custom error messages
- ✅ **Consistent API Responses** with standardized format
- ✅ **Audit Fields** (created_at, updated_at)
- ✅ **Sample Data** auto-initialization

## 📋 Prerequisites

- Java 21
- Maven 3.6+
- MySQL 8.0+

## 🛠️ Setup Instructions

### 1. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE propertydb;
```

### 2. Configuration

Update `src/main/resources/application.properties` with your MySQL credentials:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api/properties
```

### Endpoints

#### 1. Get All Properties
```http
GET /api/properties
```

#### 2. Get Property by ID
```http
GET /api/properties/{id}
```

#### 3. Create Property
```http
POST /api/properties
Content-Type: application/json

{
  "title": "2 BHK Apartment in Mumbai",
  "location": "Andheri East, Mumbai",
  "price": 8500000.0,
  "imageUrl": "https://example.com/image.jpg",
  "description": "Spacious 2-bedroom apartment with balcony."
}
```

#### 4. Update Property
```http
PUT /api/properties/{id}
Content-Type: application/json

{
  "title": "Updated Property Title",
  "location": "Updated Location",
  "price": 9000000.0,
  "imageUrl": "https://example.com/updated-image.jpg",
  "description": "Updated description."
}
```

#### 5. Delete Property
```http
DELETE /api/properties/{id}
```

#### 6. Search by Location
```http
GET /api/properties/search/location?location=Mumbai
```

#### 7. Search by Price Range
```http
GET /api/properties/search/price?minPrice=5000000&maxPrice=10000000
```

#### 8. Search by Title
```http
GET /api/properties/search/title?title=2 BHK
```

#### 9. Sort by Price (Ascending)
```http
GET /api/properties/sort/price-asc
```

#### 10. Sort by Price (Descending)
```http
GET /api/properties/sort/price-desc
```

#### 11. Health Check
```http
GET /api/properties/health
```

## 📝 Validation Rules

### PropertyRequestDto Validation:
- **title**: Required, 5-100 characters
- **location**: Required, 3-100 characters
- **price**: Required, positive, 100,000 - 100,000,000
- **imageUrl**: Required, valid HTTP/HTTPS URL, max 500 characters
- **description**: Required, 10-1000 characters

## 🔄 Response Format

All API responses follow this standardized format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  },
  "timestamp": "2024-01-15T10:30:00"
}
```

## 🏗️ Project Structure

```
src/main/java/com/rapidfacto/rapidfacto/
├── controller/
│   └── PropertyController.java
├── dto/
│   ├── ApiResponse.java
│   ├── PropertyRequestDto.java
│   ├── PropertyResponseDto.java
│   └── PropertyMapper.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   └── ResourceNotFoundException.java
├── config/
│   └── JpaConfig.java
├── Property.java
├── PropertyRepository.java
├── PropertyService.java
└── RapidfactoApplication.java
```

## 🧪 Testing

Test the API using tools like:
- **Postman**
- **cURL**
- **Insomnia**

### Example cURL Commands

```bash
# Get all properties
curl -X GET http://localhost:8080/api/properties

# Create a property
curl -X POST http://localhost:8080/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "3 BHK Flat in Delhi",
    "location": "Rohini Sector 9, Delhi",
    "price": 9500000.0,
    "imageUrl": "https://cdn.pixabay.com/photo/2018/05/09/21/38/interior-3389676_1280.jpg",
    "description": "Premium 3-bedroom flat near metro station."
  }'

# Search by location
curl -X GET "http://localhost:8080/api/properties/search/location?location=Mumbai"
```

## 🔧 Technologies Used

- **Spring Boot 3.5.4**
- **Spring Data JPA**
- **MySQL 8.0**
- **Lombok**
- **Bean Validation**
- **Maven**

## 📄 License

This project is for educational purposes. 