import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import "../styles/Weather.css";

const OPENWEATHER_API_KEY = 'cf8d0432c78210144d0c02f2a9c12bc9';

export default function Weather() {
  const location = useLocation();
  const trip = location.state?.trip;

  const [city] = useState(trip?.destination || ""); // fixed city from trip
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`);
      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeatherData({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        visibility: (data.visibility || 0) / 1000,
        description: data.weather[0].description,
        country: data.sys.country
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <Nav />
      <div className="weather-content">
        <h2>🌍 Smart Trip Planner</h2>

        {loading && <p>Fetching weather details...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {weatherData && (
          <div className="weather-result">
            <h3>🌤️ Weather in {city}, {weatherData.country}</h3>
            <p><strong>Condition:</strong> {weatherData.description}</p>
            <p><strong>Temperature:</strong> {weatherData.temperature} °C</p>
            <p><strong>Humidity:</strong> {weatherData.humidity} %</p>
            <p><strong>Wind Speed:</strong> {weatherData.windSpeed} m/s</p>
            <p><strong>Visibility:</strong> {weatherData.visibility} km</p>
          </div>
        )}
      </div>
    </div>
  );
}
