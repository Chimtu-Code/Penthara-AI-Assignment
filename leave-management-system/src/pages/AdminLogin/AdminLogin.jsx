import React from "react";
import "./AdminLogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Login page for the admin side.
const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Check the input before sending the user to the admin page.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.trim() == "" || username.trim() == "") {
      alert("Enter your Credentials");
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Admin</h1>
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
    </div>
  );
};

export default AdminLogin;
