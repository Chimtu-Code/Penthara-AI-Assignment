import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import "./ApplicationForm.css";

const EMPTY_FORM = {
  from_date: "",
  to_date: "",
  reason: "",
};

// Form to apply for a new leave.
const ApplicationForm = () => {
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [employeeId, setEmployeeId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .single();
    if (error) {
      console.log(error);
      return;
    }

    setLeaveBalance(data.leave_balance);
    setEmployeeId(data.id);
  };

  // Keep the form values updated as the user types.
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Count the number of leave days from the selected dates.
  const calculateDays = () => {
    const from = new Date(formData.from_date);
    const to = new Date(formData.to_date);

    return Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.from_date || !formData.to_date || !formData.reason) {
      alert("Please fill all fields.");
      return;
    }

    if (new Date(formData.to_date) < new Date(formData.from_date)) {
      alert("Invalid date range.");
      return;
    }

    const days = calculateDays();

    // Make sure the request does not go beyond the available leave balance.
    if (days > leaveBalance) {
      alert("Insufficient leave balance.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("leaves").insert({
      employee_id: employeeId,
      from_date: formData.from_date,
      to_date: formData.to_date,
      days,
      reason: formData.reason,
      leave_status: "pending",
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Failed to submit leave request.");
      return;
    }

    alert("Leave request submitted successfully.");

    setFormData(EMPTY_FORM);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="application-form">
      {leaveBalance > 0 ? (
        <>
          <h1>Apply for a leave</h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="from_date">FROM</label>
              <input
                type="date"
                name="from_date"
                value={formData.from_date}
                min={today}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="to_date">TO</label>
              <input
                type="date"
                name="to_date"
                value={formData.to_date}
                min={formData.from_date || today}
                onChange={handleChange}
              />
            </div>

            <div>
              <p>Reason</p>
              <textarea
                name="reason"
                placeholder="Reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Apply"}
            </button>
          </form>
        </>
      ) : (
        <h2>You are out of leaves.</h2>
      )}
    </div>
  );
};

export default ApplicationForm;
