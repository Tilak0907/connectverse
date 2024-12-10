import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(0);
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State to handle feedback messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any existing messages
    try {
      const result = await axios.post(
        "http://localhost:3001/login",
        { username, password },
        { withCredentials: true } // Send cookies for session management
      );
      console.log("Server response:", result.data);

      if (result.data === "success") {
        setMessage(""); // Clear error message
        navigate("/home"); // Redirect to home page
      } else {
        setMessage(result.data || "Login failed");
      }
    } catch (err) {
      console.error(
        "Login failed:",
        err.response ? err.response.data : err.message
      );
      setMessage(
        err.response
          ? err.response.data
          : "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="page-container">
      <div className="row w-100">
        {/* Left Column */}
        <div className="col-md-4 d-flex flex-column justify-content-center align-items-center left-col">
          <img
            src="../pic.png"
            alt="ConnectVerse Logo"
            className="logo-image"
          />
          <h1 className="main-title mt-4">ConnectVerse</h1>
          <h2 className="subtitle mt-2 text-center">
            A platform to connect thoughts
          </h2>
        </div>

        {/* Right Column */}
        <div className="col-md-4 d-flex flex-column justify-content-center align-items-center right-col">
          <div className="card-container">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Username"
                autoComplete="off"
                name="username"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="primary-btn">
                Login
              </button>
            </form>
            {message && <p className="error-msg mt-3">{message}</p>}
            <p className="text-center">Don't Have an Account?</p>
            {/* Sign Up Button */}
            <Link to="/register" className="signup-btn">
              Sign Up
            </Link>
            <p className="text-center mt-3">
              {/* Forgot Password Button */}
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
