import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "../styles/Itenary.css";

export default function Itenary() {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state?.trip;

  const cards = [
    { id: 1, label: "Event" },
    { id: 2, label: "Calendar" },
    { id: 3, label: "Route" },
    { id: 4, label: "Weather" }, // We'll use this to navigate to flights
    { id: 5, label: "Budget" }
  ];
const handleClick = (card) => {
  if (!trip) return;

  switch (card.label) {
    case "Route":
      navigate("/route", {
        state: { start: trip.startDestination, end: trip.destination },
      });
      break;
    case "Budget": // this card now opens FlightSearch
      navigate("/flights", {
        state: { start: trip.startDestination, end: trip.destination },
      });
      break;
    case "Weather":
      navigate("/weather", { state: { trip } });
      break;  
    case "Event":
        navigate("/events", { state: { trip } }); // ✅ Navigate to Events page
        break;
  
    default:
      alert(`You clicked ${card.label}`);
      break;
  }
};

  return (
    <div className="itenary-container">
      <Nav />
      <div className="itenary-header">Itenary</div>
      <div className="itenary-content">
        {cards.map((card) => (
          <div
            key={card.id}
            className="day-card"
            onClick={() => handleClick(card)}
          >
            <h3>{card.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
