import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import { supabase } from "../../utils/supabaseClient";

// Admin view for checking and updating leave requests.
const AdminPage = () => {
  const [status, setStatus] = useState("pending");
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, [status]);

  const fetchLeaves = async () => {
    const { data, error } = await supabase
      .from("leaves")
      .select(
        `
        *,
        employees (
          name,
          username
        )
      `,
      )
      .eq("leave_status", status)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setLeaves(data);
  };

  // Update the request status and reduce the balance when approved.
  const updateStatus = async (id, newStatus, days) => {
    const { error } = await supabase
      .from("leaves")
      .update({ leave_status: newStatus })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    if (newStatus === "approved") {
      const { data: employee } = await supabase
        .from("employees")
        .select("*")
        .single();

      await supabase
        .from("employees")
        .update({
          leave_balance: employee.leave_balance - days,
        })
        .eq("id", employee.id);
    }

    fetchLeaves();
  };

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>

      <div className="admin-tabs">
        <button onClick={() => setStatus("pending")}>Pending</button>

        <button onClick={() => setStatus("approved")}>Approved</button>

        <button onClick={() => setStatus("rejected")}>Rejected</button>
      </div>

      {leaves.length === 0 ? (
        <div className="no-requests">No Requests Found</div>
      ) : (
        leaves.map((leave) => (
          <div className="leave-card" key={leave.id}>
            <div className="leave-card-header">
              <div>
                <h3>{leave.employees.name}</h3>
                <p>@{leave.employees.username}</p>
              </div>

              <span className={`status ${leave.leave_status}`}>
                {leave.leave_status}
              </span>
            </div>

            <div className="leave-details">
              <p>
                <strong>From:</strong> {leave.from_date}
              </p>

              <p>
                <strong>To:</strong> {leave.to_date}
              </p>

              <p>
                <strong>Days:</strong> {leave.days}
              </p>

              <p>
                <strong>Reason:</strong> {leave.reason}
              </p>

              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(leave.created_at).toLocaleDateString()}
              </p>
            </div>

            {status === "pending" && (
              <div className="leave-actions">
                <button
                  onClick={() => updateStatus(leave.id, "approved", leave.days)}
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(leave.id, "rejected", leave.days)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
