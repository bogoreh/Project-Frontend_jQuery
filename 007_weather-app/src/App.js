import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import { getWeatherByCity, getWeatherByCoords } from './services/weatherAPI';
import './styles/App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get weather by city name
  const handleSearch = async (city) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Get weather by current location
  const getCurrentLocationWeather = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoords(latitude, longitude);
          setWeather(data);
        } catch (err) {
          setError('Failed to get weather data for your location');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  // Load default city on component mount
  useEffect(() => {
    handleSearch('London');
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>Weather Forecast</h1>
          <p>Get real-time weather information</p>
        </header>

        <SearchBar 
          onSearch={handleSearch} 
          onLocationClick={getCurrentLocationWeather}
        />

        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {weather && !loading && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;