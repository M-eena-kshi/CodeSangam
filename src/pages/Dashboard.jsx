import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Dashboard.css"
import Nav from "../components/Nav";



export default function Dashboard() {
  return(
    <div className="background-containerr">
      {/*header*/}
        <Nav />
      <div className="background-content">
        
        
        <div className="center-box"><p>Sync Your Vibe 
          <br></br>
          Find Your Trip 
          <br>
          </br>
          With TripSync</p></div>

        
        
      </div>
      
    </div>
    
  );
  
}

