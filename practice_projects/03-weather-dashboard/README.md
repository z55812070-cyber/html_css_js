# Weather Dashboard

A beautiful, real-time weather application that fetches data from a weather API with location detection, forecasts, and dynamic UI.

## 🎯 Learning Objectives

- Fetch API and async/await
- Error handling with try/catch
- Geolocation API
- JSON parsing and manipulation
- Dynamic DOM updates
- Working with external APIs
- Loading states and error UI

## 📋 Features

- 🔍 Search by city name
- 📍 Auto-detect location
- 🌡️ Current weather display
- 📅 5-day forecast
- 🎨 Dynamic backgrounds based on weather
- 🌙 Sunrise/sunset times
- 💨 Wind speed, humidity, pressure
- 🗺️ Weather condition icons
- ⚠️ Error handling for invalid cities

## 🛠️ Concepts Applied

### JavaScript
- Async/await patterns
- Fetch API for HTTP requests
- Geolocation API
- Promise.all for parallel requests
- Error boundaries
- Debouncing for search

### CSS
- Dynamic theming based on weather
- Responsive grid layouts
- CSS animations for loading states
- Gradient backgrounds
- Media queries

### API Integration
- RESTful API consumption
- Query parameters
- API key management
- Rate limiting awareness
- Fallback data

## 📁 Files Included

- `index.html` - Application structure
- `style.css` - Complete styling with weather themes
- `script.js` - API integration and app logic
- `.env.example` - Environment variable template

## 🚀 Getting Started

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file or replace `YOUR_API_KEY` in script.js
3. Open `index.html` in your browser
4. Allow location access when prompted

## 🌐 API Reference

This project uses the OpenWeatherMap API:
- Current Weather: `api.openweathermap.org/data/2.5/weather`
- Forecast: `api.openweathermap.org/data/2.5/forecast`

## 💡 Customization Ideas

- Add weather maps
- Implement unit conversion (Celsius/Fahrenheit)
- Add air quality index
- Create weather alerts
- Add historical weather data
- Integrate with calendar for event planning

---

**Next Steps:** Try adding a backend to cache API responses, or integrate with other weather APIs for comparison!
