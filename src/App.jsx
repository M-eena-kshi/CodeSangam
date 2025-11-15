import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TripPlanner from "./pages/TripPlanner";
import Profile from "./pages/Profile";
import Itenary from "./pages/Itenary";
import Login from "./pages/Login";
import RouteFinder from "./pages/RouteFinder";
import FlightSearch from "./pages/FlightSearch";
import Weather from "./pages/Weather"; 
import Events from "./pages/Events"; // ✅ Import Events page

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/planner" element={<TripPlanner />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Itenary" element={<Itenary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/route" element={<RouteFinder />} />
        <Route path="/flights" element={<FlightSearch />} /> 
        <Route path="/weather" element={<Weather />} /> 
        <Route path="/events" element={<Events />} /> {/* ✅ Add Events route */}
      </Routes>
    </div>
  );
}
