import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import LeavesCount from "../../components/LeavesCount/LeavesCount";
import ApplicationForm from "../../components/ApplicationForm/ApplicationForm";
import LeavesHistory from "../../components/ApplicationHistory/LeavesHistory";

import "./Home.css";

// Main dashboard page for the employee.
const Home = () => {
  return (
    <div className="dashboard">
      <NavBar />
      <LeavesCount />
      <div className="form-n-history">
        <ApplicationForm />
        <LeavesHistory />
      </div>
    </div>
  );
};

export default Home;
