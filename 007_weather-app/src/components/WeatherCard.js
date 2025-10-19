import React from 'react';

const WeatherCard = ({ weather }) => {
  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main, description, icon }],
    wind: { speed },
    sys: { country },
    visibility
  } = weather;

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatTemperature = (temp) => {
    return `${Math.round(temp)}°C`;
  };

  const formatVisibility = (vis) => {
    return `${(vis / 1000).toFixed(1)} km`;
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <h2>{name}, {country}</h2>
        </div>
        <div className="weather-main">
          <img 
            src={getWeatherIcon(icon)} 
            alt={description}
            className="weather-icon"
          />
          <div className="temperature">
            {formatTemperature(temp)}
          </div>
        </div>
        <div className="weather-description">
          {main} - {description}
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels like:</span>
          <span className="detail-value">{formatTemperature(feels_like)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure:</span>
          <span className="detail-value">{pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed:</span>
          <span className="detail-value">{speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Visibility:</span>
          <span className="detail-value">{formatVisibility(visibility)}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;