import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import "../styles/Events.css";

export default function Events() {
  const location = useLocation();
  const trip = location.state?.trip;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const city = trip?.destination || "";
  const startDate = trip?.startDate;
  const endDate = trip?.endDate;

  useEffect(() => {
    if (city) fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, startDate, endDate]);

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    setEvents([]);

    try {
      // ✅ Call your backend instead of RapidAPI directly
      let url = `http://localhost:3001/events?city=${encodeURIComponent(city)}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`API request failed: ${res.status}`);

      const data = await res.json();
      console.log("Backend Response:", data);

      // Adjust if API structure differs
      if (data.events && data.events.length > 0) {
        setEvents(data.events);
      } else if (data.results && data.results.length > 0) {
        setEvents(data.results);
      } else {
        setEvents([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="events-container">
      <Nav />
      <div className="events-content">
        <h2>🎉 Events in {city || "your destination"}</h2>

        {loading && <p>Loading events...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {!loading && events.length === 0 && !error && (
          <p>No events found for this period. Try changing dates or city.</p>
        )}

        <ul>
          {events.map((event, index) => (
            <li key={index} className="event-card">
              <h3>{event.title || "Untitled Event"}</h3>
              <p>
                <strong>Date:</strong> {event.start_date || "TBA"}
              </p>
              <p>
                <strong>Location:</strong> {event.location || "TBA"}
              </p>
              {event.url && (
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  More Info
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
