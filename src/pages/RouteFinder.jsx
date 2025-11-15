import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "leaflet/dist/leaflet.css";

export default function RouteFinder() {
  const location = useLocation();
  const trip = location.state; // { start, end }

  const [start, setStart] = useState(trip?.start || "");
  const [end, setEnd] = useState(trip?.end || "");
  const [mode, setMode] = useState("driving-car");
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (start && end) handleRoute();
    // eslint-disable-next-line
  }, []);

  // -----------------------------
  //  Use local backend proxy
  // -----------------------------
  const LOCAL_PROXY = "http://localhost:3001";

  const geocodePlace = async (place) => {
    if (!place.includes(",")) {
      try {
        const res = await axios.get(`${LOCAL_PROXY}/geocode`, {
          params: { text: place },
        });

        if (res.data.features && res.data.features.length > 0) {
          const [lon, lat] = res.data.features[0].geometry.coordinates;
          return `${lon},${lat}`;
        } else {
          alert(`Could not find coordinates for "${place}"`);
          return null;
        }
      } catch (err) {
        console.error(err);
        alert("Error in geocoding API");
        return null;
      }
    }
    return place;
  };

  const handleRoute = async () => {
    if (!start || !end) return;

    const startCoords = await geocodePlace(start);
    const endCoords = await geocodePlace(end);
    if (!startCoords || !endCoords) return;

    try {
      const res = await axios.get(`${LOCAL_PROXY}/route`, {
        params: { start: startCoords, end: endCoords, mode },
      });

      const coords = res.data.features[0].geometry.coordinates.map(
        (c) => [c[1], c[0]]
      );

      const summary = res.data.features[0].properties.summary;

      setRoute(coords);
      setDistance((summary.distance / 1000).toFixed(2) + " km");
      setDuration((summary.duration / 60).toFixed(2) + " mins");
    } catch (err) {
      alert("Error fetching directions.");
      console.error(err);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">🗺️ Route Finder</h1>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="End"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="driving-car">🚗 Car</option>
          <option value="cycling-regular">🚴 Cycling</option>
          <option value="foot-walking">🚶 Walking</option>
          <option value="driving-hgv">🚚 Truck</option>
        </select>

        <button
          onClick={handleRoute}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Show Route
        </button>
      </div>

      {distance && (
        <div className="mb-4">
          <p>
            <strong>Distance:</strong> {distance}
          </p>
          <p>
            <strong>Duration:</strong> {duration}
          </p>
        </div>
      )}

      <MapContainer
        center={[26.9124, 75.7873]}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {route && (
          <>
            <Marker position={route[0]} />
            <Marker position={route[route.length - 1]} />
            <Polyline positions={route} color="blue" />
          </>
        )}
      </MapContainer>
    </div>
  );
}
