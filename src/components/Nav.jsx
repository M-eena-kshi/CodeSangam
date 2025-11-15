import React, { useEffect, useRef, useState } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate(); // 👈 for internal navigation

  const getColor = () => {
    switch (location.pathname) {
      case "/":
        return "rgba(155, 13, 60, 0.4)";
      case "/planner":
        return "rgba(26, 44, 158, 0.6)";
      case "/profile":
        return "rgba(174, 123, 213, 0.6)";
      case "/login":
        return "rgba(0, 128, 128, 0.6)";
      default:
        return "transparent";
    }
  };

  const navRef = useRef(null);
  const [markerStyle, setMarkerStyle] = useState({ left: 0, width: 0 });

  const updateMarker = (el) => {
    if (el) {
      setMarkerStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  };

  useEffect(() => {
    const active = navRef.current.querySelector('.active');
    if (active) updateMarker(active);
  }, [location.pathname]);

  useEffect(() => {
    const active = navRef.current.querySelector('.active');
    if (active) updateMarker(active);
  }, []);

  // 👇 Navigate to /login page inside React app
  const handleLoginClick = () => {
    navigate("/login", { state: { from: location.pathname } });

  };

  return (
    <div
      className="top-header"
      style={{
        backgroundColor: getColor(),
        transition: "background-color 0.4s ease",
      }}
    >
      <div className="brand">TripSync</div>

      <nav ref={navRef} className="nav-menu">
        {['/', '/planner', '/profile'].map((path, i) => {
          const labels = ['Home', 'Planner', 'Profile'];
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive ? 'nav-item active' : 'nav-item'
              }
              onMouseEnter={(e) => updateMarker(e.target)}
              onClick={(e) => updateMarker(e.target)}
            >
              {labels[i]}
            </NavLink>
          );
        })}

        {/* login button now navigates inside React */}
        <button
          className="nav-item-login-btn"
          onClick={handleLoginClick}
          onMouseEnter={(e) => updateMarker(e.target)}

         
        >
          Login
        </button>

        <span
          className="marker"
          style={{ left: markerStyle.left, width: markerStyle.width }}
        />
      </nav>
    </div>
  );
}
