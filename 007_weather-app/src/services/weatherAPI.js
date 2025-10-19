import $ from 'jquery';

const API_KEY = '40c42f9eed351677d71026af3d58b96d'; // Get from https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// jQuery AJAX implementation for weather API calls
export const getWeatherByCity = (city) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${BASE_URL}/weather`,
      method: 'GET',
      data: {
        q: city,
        appid: API_KEY,
        units: 'metric', // For Celsius, use 'imperial' for Fahrenheit
        lang: 'en'
      },
      success: (data) => {
        resolve(data);
      },
      error: (xhr, status, error) => {
        reject(new Error(xhr.responseJSON?.message || 'Failed to fetch weather data'));
      }
    });
  });
};

export const getWeatherByCoords = (lat, lon) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${BASE_URL}/weather`,
      method: 'GET',
      data: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'en'
      },
      success: (data) => {
        resolve(data);
      },
      error: (xhr, status, error) => {
        reject(new Error(xhr.responseJSON?.message || 'Failed to fetch weather data'));
      }
    });
  });
};

// Alternative: Get 5-day forecast (for future enhancement)
export const getForecast = (city) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${BASE_URL}/forecast`,
      method: 'GET',
      data: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'en'
      },
      success: (data) => {
        resolve(data);
      },
      error: (xhr, status, error) => {
        reject(new Error(xhr.responseJSON?.message || 'Failed to fetch forecast data'));
      }
    });
  });
};