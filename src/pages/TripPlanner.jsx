import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Nav from "../components/Nav";
import '../styles/TripPlanner.css';

function daysBetween(startStr, endStr) {
  const s = new Date(startStr);
  const e = new Date(endStr);
  s.setHours(0, 0, 0, 0);
  e.setHours(0, 0, 0, 0);
  const diffMs = e - s;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
}

export default function TripPlanner() {
  const navigate = useNavigate();

  const [startDestination, setStartDestination] = useState('');
  const [destination, setDestination] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = (e) => {
    e.preventDefault();
    setError('');

    if (!startDestination || !destination || !start || !end) {
      setError('Please fill start destination, destination, start and end dates.');
      return;
    }

    const days = daysBetween(start, end);
    if (days <= 0) {
      setError('End date must be the same or after the start date.');
      return;
    }

    const itinerary = [];
    for (let i = 0; i < days; i++) {
      itinerary.push({
        day: i + 1,
        date: new Date(new Date(start).getTime() + i * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
        activities: ['Sightseeing', 'Local food experience', 'Free time / rest']
      });
    }

    const trip = {
      id: uuidv4(),
      startDestination,
      destination,
      start,
      end,
      budget: budget ? Number(budget) : null,
      itinerary,
      createdAt: new Date().toISOString()
    };

    // Save trip to localStorage if needed
    localStorage.setItem(`trip-${trip.id}`, JSON.stringify(trip));

    // Navigate to Itenary and pass trip
    navigate('/Itenary', { state: { trip } });
  };

  return (
    <div className="background-container">
      <Nav />
      <div className="container">
        <form className="form-wrapper" onSubmit={handleGenerate}>
          {error && <div className="form-error">{error}</div>}

          <div className="tile blue">
            <span className="tile-label">Start Destination</span>
            <input
              className="input"
              value={startDestination}
              onChange={e => setStartDestination(e.target.value)}
              placeholder="e.g. Mumbai"
            />
          </div>

          <div className="tile green">
            <span className="tile-label">Destination</span>
            <input
              className="input"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              placeholder="e.g. Paris"
            />
          </div>

          <div className="tile purple dates-tile">
            <span className="tile-label">Start Date</span>
            <input
              className="input"
              type="date"
              value={start}
              onChange={e => setStart(e.target.value)}
            />
          </div>

          <div className="tile purple dates-tile">
            <span className="tile-label">End Date</span>
            <input
              className="input"
              type="date"
              value={end}
              min={start}
              onChange={e => setEnd(e.target.value)}
            />
          </div>

          <div className="tile yellow">
            <span className="tile-label">Budget</span>
            <input
              className="input"
              type="number"
              min="0"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              placeholder="optional"
            />
          </div>

          <div className="actions">
            <button type="submit" className="button">Generate Itinerary</button>
          </div>
        </form>
      </div>
    </div>
  );
}
