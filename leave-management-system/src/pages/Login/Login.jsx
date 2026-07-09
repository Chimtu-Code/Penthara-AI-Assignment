import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

// Simple login screen for employees.
const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.trim() == "" || username.trim() == "") {
      alert("Enter your Credentials");
      return;
    }
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome</h1>
        <p>Enter your credentials</p>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <div>
              <img src="/profile.svg" alt="PROFILE" />
              <input
                type="text"
                name="username"
                value={username}
                placeholder="ajay_kamal"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <img src="/password-lock.svg" alt="PASSWORD" />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="•••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
      <div className="admin-redirect">
        <p>
          Admin Login?<a href="/admin-login"> Click Here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
