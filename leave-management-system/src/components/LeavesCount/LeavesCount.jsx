import React, { useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useState } from "react";
import "./LeavesCount.css";

// Shows how many leave days are left.
const LeavesCount = () => {
  const [leaveBalance, setLeaveBalance] = useState(0);

  useEffect(() => {
    fetchLeaveBalance();
  }, []);

  const fetchLeaveBalance = async () => {
    const { data } = await supabase.from("employees").select("*").single();
    setLeaveBalance(data.leave_balance);
  };

  return (
    <div className="leave-balance-card">
      <div className="leave-balance-card-wrapper">
        <div className="left-section">
          Your remaining leave balance for this month
        </div>
        <div className="right-section">
          <p>{leaveBalance} days</p>
        </div>
      </div>
    </div>
  );
};

export default LeavesCount;
