import React from "react";
import { useState, useEffect } from "react";
import "./LeavesHistory.css";
import { supabase } from "../../utils/supabaseClient";

// Lists the leave requests already made.
const LeavesHistory = () => {
  const [leavesHistory, setLeavesHistory] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const { data, error } = await supabase
      .from("leaves")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    setLeavesHistory(data);
  };

  const HistoryCard = ({ leave }) => {
    const appliedOn = new Date(leave.created_at).toLocaleDateString("en-IN");
    const fromDate = new Date(leave.from_date).toLocaleDateString("en-IN");
    const toDate = new Date(leave.to_date).toLocaleDateString("en-IN");

    return (
      <div className="history-card">
        <div className="history-card-header">
          <h3>Leave Request</h3>

          <span className={`status-badge ${leave.leave_status.toLowerCase()}`}>
            {leave.leave_status}
          </span>
        </div>

        <div className="history-details">
          <p>
            <strong>Applied:</strong> {appliedOn}
          </p>

          <p>
            <strong>From:</strong> {fromDate}
          </p>

          <p>
            <strong>To:</strong> {toDate}
          </p>

          <p>
            <strong>Days:</strong> {leave.days}
          </p>

          <p>
            <strong>Reason:</strong> {leave.reason}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="leaves-history-card">
      <h1>Your leaves History</h1>
      <div className="history-container">
        {leavesHistory.length === 0 ? (
          <p className="empty-history">No leave applications yet.</p>
        ) : (
          leavesHistory.map((leave) => (
            <HistoryCard key={leave.id} leave={leave} />
          ))
        )}
      </div>
    </div>
  );
};

export default LeavesHistory;
