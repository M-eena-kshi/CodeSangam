import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:3001/login", { email, password });

        if (res.data.status === "Success") {
          alert("Login successful!");
          navigate("/"); // ✅ Force navigation to homepage
        } else {
          alert(res.data.status);
        }
      } else {
        const res = await axios.post("http://localhost:3001/register", { name, email, password });

        if (res.data.status === "Already registered") {
          alert("User already exists! Please login.");
          setIsLogin(true);
        } else {
          alert("Signup successful! Please login.");
          setIsLogin(true);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error! Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isLogin ? "Login" : "Signup"}</button>

        <p className="toggle-text">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}
