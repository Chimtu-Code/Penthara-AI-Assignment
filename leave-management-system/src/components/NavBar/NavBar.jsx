import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import { useState, useEffect } from "react";

// Shows the top bar and the employee name.
const NavBar = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    fetchName();
  }, []);

  const fetchName = async () => {
    const { data } = await supabase.from("employees").select("*").single();
    setName(data.name);
  };

  return (
    <div className="nav-bar">
      <div className="nav-bar-wrapper">
        <div className="logo-section">
          <img src="/penthara_logo.jpg" alt="logo" className="logo-img" />
        </div>
        <div className="header-name">Dashboard</div>
        <div className="user-name">Hi {name}</div>
      </div>
    </div>
  );
};

export default NavBar;
