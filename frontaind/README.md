# 🏠 PropertyFinder - React Frontend

A modern property listing application built with React, Tailwind CSS, and Axios for API integration.

## Features

- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔍 **Advanced Search & Filtering** - Search by title/description, filter by location and price range
- 🎨 **Modern UI** - Beautiful design with Tailwind CSS
- 📊 **Property Cards** - Display key information like price, location, bedrooms, bathrooms, and area
- 🔗 **API Ready** - Configured with Axios for backend integration
- 💰 **Indian Currency Format** - Properly formatted prices in INR
- 🖼️ **Image Handling** - Fallback images for broken links

## Tech Stack

- **React 19** - Latest React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── PropertyCard.jsx      # Individual property card component
│   ├── PropertyList.jsx      # Main property listing with filters
│   └── PropertyDetail.jsx    # Property detail modal
├── data/
│   └── properties.js         # Mock property data
├── services/
│   └── api.js               # API service with Axios configuration
├── App.jsx                  # Main application component
└── index.css               # Tailwind CSS styles
```

## API Integration

The application is configured to work with your Spring Boot backend API at `http://localhost:8080/api/properties`.

### Backend Requirements

Your Spring Boot backend should provide these endpoints:

- `GET /api/properties` - Returns array of all properties
- `GET /api/properties/{id}` - Returns single property by ID
- `POST /api/properties` - Creates new property
- `PUT /api/properties/{id}` - Updates existing property
- `DELETE /api/properties/{id}` - Deletes property

### Property Data Structure

Your API should return properties in this format:

```json
{
  "id": 1,
  "title": "2 BHK Apartment in Mumbai",
  "location": "Andheri East, Mumbai",
  "price": 8500000,
  "imageUrl": "https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg",
  "description": "Spacious 2-bedroom apartment with balcony and great sunlight.",
  "bedrooms": 2,
  "bathrooms": 2,
  "area": "1200 sq ft"
}
```

### CORS Configuration

Make sure your Spring Boot backend has CORS enabled for the frontend:

```java
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class PropertyController {
    // Your controller methods
}
```

### Available API Endpoints

- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/search` - Search properties with filters

## Features in Detail

### Search & Filtering
- **Text Search**: Search by property title or description
- **Location Filter**: Filter by city/location
- **Price Range**: Filter by price brackets (Under ₹50L, ₹50L-1Cr, etc.)
- **Clear Filters**: Reset all filters with one click

### Property Information
- Property title and location
- Price in Indian Rupees format
- Number of bedrooms and bathrooms
- Property area
- High-quality images from Pixabay
- Detailed descriptions

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly interface
- Optimized for all devices

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for custom component styles
- Use Tailwind utility classes for quick styling

### Data Structure
Property objects should have this structure:
```javascript
{
  id: number,
  title: string,
  location: string,
  price: number,
  imageUrl: string,
  description: string,
  bedrooms: number,
  bathrooms: number,
  area: string
}
```

## Future Enhancements

- [ ] User authentication
- [ ] Property favoriting
- [ ] Advanced filters (property type, amenities)
- [ ] Map integration
- [ ] Property comparison
- [ ] Contact forms
- [ ] Image galleries
- [ ] Reviews and ratings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License. 