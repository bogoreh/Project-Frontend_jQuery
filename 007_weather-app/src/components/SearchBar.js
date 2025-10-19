import React, { useState } from 'react';

const SearchBar = ({ onSearch, onLocationClick }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity('');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>
      <button 
        onClick={onLocationClick} 
        className="location-btn"
        title="Get current location weather"
      >
        📍 Current Location
      </button>
    </div>
  );
};

export default SearchBar;