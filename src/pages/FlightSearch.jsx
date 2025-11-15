import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function FlightSearch() {
  const location = useLocation();
  const trip = location.state;

  const [origin, setOrigin] = useState(trip?.start || "");
  const [destination, setDestination] = useState(trip?.end || "");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!origin || !destination || !date) return alert("Enter all fields");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/flights/search", {
        origin,
        destination,
        date,
      });
      setFlights(res.data);
    } catch (err) {
      alert("Error fetching flights");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2>✈ Flight Search</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Origin"
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "8px 20px" }}>
          Search Flights
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {flights.map((flight, index) => {
          const segment = flight.itineraries[0].segments[0];
          return (
            <li
              key={index}
              style={{
                margin: "10px auto",
                width: "60%",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            >
              <strong>{segment.carrierCode}</strong> — {segment.departure.iataCode} ➜ {segment.arrival.iataCode}
              <br />
              ✈ Duration: {segment.duration} <br />
              💰 Price: {flight.price.total} {flight.price.currency}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FlightSearch;
