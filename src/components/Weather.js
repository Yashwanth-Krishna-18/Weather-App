import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'; // ✅ This stays here

// ✅ Import CSS

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = "6e73c14ef41a239d9f3d9c449bf27d3a";

  const getWeather = async () => {
    if (!city) {
      alert("Please enter a city name!");
      return;
    }
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (error) {
      alert("City not found!");
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h1>🌦️ Weather Forecast</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Check</button>
      </div>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p className="condition">{weather.weather[0].main}</p>
          <p className="temperature">{weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
