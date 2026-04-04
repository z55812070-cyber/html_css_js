// Weather Dashboard - Main JavaScript File
// This application demonstrates: Async/Await, API Integration, Error Handling, 
// Geolocation, DOM Manipulation, and LocalStorage

// Configuration
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorMessageEl = document.getElementById('error-message');
const weatherContent = document.getElementById('weather-content');

// State
let currentCity = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadLastSearchedCity();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    locationBtn.addEventListener('click', handleGeolocation);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

// Search Handlers
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    await fetchWeatherData(city);
}

async function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading();
    
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 10000,
                enableHighAccuracy: true
            });
        });

        const { latitude, longitude } = position.coords;
        await fetchWeatherByCoordinates(latitude, longitude);
    } catch (error) {
        console.error('Geolocation error:', error);
        showError('Unable to get your location. Please search manually.');
    }
}

// API Calls
async function fetchWeatherData(city) {
    showLoading();
    
    try {
        const weatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (!weatherResponse.ok) {
            throw new Error('City not found. Please check the spelling.');
        }

        if (!forecastResponse.ok) {
            throw new Error('Forecast data unavailable.');
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        currentCity = city;
        saveLastSearchedCity(city);
        displayWeatherData(weatherData, forecastData);
        
    } catch (error) {
        console.error('Fetch error:', error);
        showError(error.message || 'Failed to fetch weather data. Please try again.');
    }
}

async function fetchWeatherByCoordinates(lat, lon) {
    try {
        const weatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (!weatherResponse.ok) {
            throw new Error('Unable to fetch weather data for your location');
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        currentCity = weatherData.name;
        saveLastSearchedCity(currentCity);
        displayWeatherData(weatherData, forecastData);
        
    } catch (error) {
        console.error('Coordinate fetch error:', error);
        showError(error.message || 'Failed to fetch weather data for your location.');
    }
}

// Display Functions
function displayWeatherData(weatherData, forecastData) {
    hideLoading();
    hideError();

    // Update current weather
    updateCurrentWeather(weatherData);
    
    // Update forecast
    updateForecast(forecastData);
    
    // Show content
    weatherContent.classList.remove('hidden');
}

function updateCurrentWeather(data) {
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('current-date').textContent = formatDate(new Date());
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    document.getElementById('weather-icon').alt = data.weather[0].description;
    document.getElementById('temperature').textContent = Math.round(data.main.temp) + '°';
    document.getElementById('feels-like').textContent = Math.round(data.main.feels_like) + '°';
    document.getElementById('humidity').textContent = data.main.humidity + '%';
    document.getElementById('wind-speed').textContent = Math.round(data.wind.speed * 3.6) + ' km/h';
    document.getElementById('pressure').textContent = data.main.pressure + ' hPa';
    document.getElementById('visibility').textContent = (data.visibility / 1000).toFixed(1) + ' km';
    document.getElementById('sunrise').textContent = formatTime(data.sys.sunrise, data.timezone);
    document.getElementById('sunset').textContent = formatTime(data.sys.sunset, data.timezone);
}

function updateForecast(data) {
    const forecastGrid = document.getElementById('forecast-grid');
    forecastGrid.innerHTML = '';

    // Group forecast by day and get one reading per day (noon)
    const dailyForecasts = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        // Prefer noon readings or first available
        if (!dailyForecasts[dayKey] || date.getHours() === 12) {
            dailyForecasts[dayKey] = item;
        }
    });

    // Convert to array and limit to 5 days
    const forecasts = Object.values(dailyForecasts).slice(0, 5);

    forecasts.forEach(day => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const tempLow = Math.round(day.main.temp_min);
        const tempHigh = Math.round(day.main.temp_max);
        const icon = day.weather[0].icon;
        const description = day.weather[0].description;

        card.innerHTML = `
            <p class="forecast-day">${dayName}</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" 
                 alt="${description}" 
                 class="forecast-icon">
            <p class="forecast-temp">${temp}°</p>
            <p class="forecast-temp-low">${tempLow}° / ${tempHigh}°</p>
        `;
        
        forecastGrid.appendChild(card);
    });
}

// Utility Functions
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(timestamp, timezone) {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function showLoading() {
    loadingEl.classList.remove('hidden');
    weatherContent.classList.add('hidden');
    hideError();
}

function hideLoading() {
    loadingEl.classList.add('hidden');
}

function showError(message) {
    hideLoading();
    weatherContent.classList.add('hidden');
    errorMessageEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function hideError() {
    errorEl.classList.add('hidden');
}

// LocalStorage Functions
function saveLastSearchedCity(city) {
    try {
        localStorage.setItem('lastSearchedCity', city);
    } catch (error) {
        console.warn('LocalStorage not available:', error);
    }
}

function loadLastSearchedCity() {
    try {
        const lastCity = localStorage.getItem('lastSearchedCity');
        if (lastCity) {
            cityInput.value = lastCity;
        }
    } catch (error) {
        console.warn('LocalStorage not available:', error);
    }
}

// Bonus: Add keyboard shortcut (Ctrl/Cmd + K to focus search)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        cityInput.focus();
    }
});

console.log('Weather Dashboard initialized successfully! 🌤️');
console.log('Remember to replace YOUR_OPENWEATHERMAP_API_KEY with your actual API key.');
