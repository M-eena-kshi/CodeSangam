import React, { useState } from 'react';
import Nav from "../components/Nav";
import '../styles/Profile.css';

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    nationality: '',
    city: '',
    state: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Profile saved:', profile);
  };

  return (
    <div className="profile-container">
      <Nav />
      <div className="container">
        <form className="form-wrapper-p" onSubmit={handleSave}>
          <h2 style={{ marginBottom: '1rem', color: 'white' }}>Profile Details</h2>

          <div className="tiles-grid">
            <div className="tile blue">
              <span className="tile-label">First Name</span>
              <input
                className="input"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>

            <div className="tile green">
              <span className="tile-label">Last Name</span>
              <input
                className="input"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>

            <div className="tile purple">
              <span className="tile-label">Gender</span>
              <select
                className="input-g"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                
              >
                <option value="" >Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="tile purple">
              <span className="tile-label">Date of Birth</span>
              <input
                className="input"
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
              />
            </div>

            <div className="tile yellow">
              <span className="tile-label">Nationality</span>
              <input
                className="input"
                name="nationality"
                value={profile.nationality}
                onChange={handleChange}
                placeholder="Nationality"
              />
            </div>

            <div className="tile blue">
              <span className="tile-label">City</span>
              <input
                className="input"
                name="city"
                value={profile.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>

            <div className="tile green">
              <span className="tile-label">State</span>
              <input
                className="input"
                name="state"
                value={profile.state}
                onChange={handleChange}
                placeholder="State"
              />
            </div>

            <div className="tile purple">
              <span className="tile-label">Email</span>
              <input
                className="input"
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <div className="tile yellow">
              <span className="tile-label">Phone Number</span>
              <input
                className="input"
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="actions">
            <button type="submit" className="button-p">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
