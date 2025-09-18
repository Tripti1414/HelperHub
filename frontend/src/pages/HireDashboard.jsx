import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import HireForm from './HireForm';
import './HireDashboard.css';
import { logoutApi } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../context/auth.context';

const HireDashboard = () => {
  const { userId } = useContext(authContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Post a new job
  const handleSubmit = async (formData) => {
    if (!user) return alert("User not logged in!");
    try {
      await axios.post("http://localhost:5000/api/requests", {
        ...formData,
        hireeId: user._id,
      });
      toast.success("Job posted successfully!");
      // Refresh hiree jobs
      const reqRes = await axios.get("http://localhost:5000/api/requests", {
        params: { hireeId: user._id },
      });
      setRequests(reqRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Error posting job");
    }
  };

  // Accept/Reject worker
  const respondToWorker = async (applicationId, response) => {
    try {
      await axios.put(`http://localhost:5000/api/applications/${applicationId}`, {
        status: response,
      });

      // Update frontend state
      setApplications(prev =>
        prev.map(app =>
          app._id === applicationId ? { ...app, status: response } : app
        )
      );

      toast.success(`Worker ${response}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to respond to worker");
    }
  };

  // Fetch hiree's jobs
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get("http://localhost:5000/api/requests", {
          params: { hireeId: user._id },
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };
    fetchRequests();
  }, [user?._id]);

  // Fetch all applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/applications");
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Filter workers who applied to hiree's jobs
  const appliedWorkers = applications.filter(app =>
    app.status === 'applied' && app.request && app.request.hireeId === user?._id
  );

  // Filter decided applications (accepted/rejected)
  const decidedApplications = applications.filter(app =>
    (app.status === 'accepted' || app.status === 'rejected') &&
    app.request && app.request.hireeId === user?._id
  );

  // Summary counts
  const acceptedCount = decidedApplications.filter(app => app.status === 'accepted').length;
  const rejectedCount = decidedApplications.filter(app => app.status === 'rejected').length;
  const pendingCount = appliedWorkers.length;

  // Delete job
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/requests/${id}`);
      setRequests(prev => prev.filter(req => req._id !== id));
      toast.success("Job deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logoutApi();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (e) {
      console.error(e);
      toast.error("Failed to log out. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="hire-dashboard">
      <div className="dashboard-header">
        <h2>Hiree Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">LogOut</button>
      </div>

      <section>
        <h3>Post a New Job</h3>
        <HireForm onSubmit={handleSubmit} />
      </section>

      <section>
        <h3>My Posted Jobs</h3>
        {requests.length > 0 ? (
          <ul>
            {requests.map(req => (
              <li key={req._id} className="job-card">
                <strong>{req.category}</strong> — {req.description} <br />
                📍 {req.address} | 🗓 {req.date} at {req.time} <br />
                <button onClick={() => handleDelete(req._id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : <p>No jobs posted yet.</p>}
      </section>

      <section>
        <h3>Explore Workers (Applied)</h3>
        {appliedWorkers.length > 0 ? (
          <ul>
            {appliedWorkers.map(app => (
              <li key={app._id} className="worker-card">
                <strong>Name:</strong> {app.worker?.username || "N/A"}<br />
                <strong>Category:</strong> {app.request?.category || "N/A"}<br />
                <strong>Job:</strong> {app.request?.description || "N/A"}<br />
                <button onClick={() => respondToWorker(app._id, 'accepted')}>Accept</button>
                <button onClick={() => respondToWorker(app._id, 'rejected')}>Reject</button>
              </li>
            ))}
          </ul>
        ) : <p>No workers have applied yet.</p>}
      </section>

      <section>
        <h3>Decided Applications (Accepted/Rejected)</h3>
        {decidedApplications.length > 0 ? (
          <ul>
            {decidedApplications.map(app => (
              <li key={app._id} className={`status-card ${app.status}`}>
                Worker: {app.worker?.username || app.workerName} — <strong>{app.status}</strong>
              </li>
            ))}
          </ul>
        ) : <p>No decisions made yet.</p>}
      </section>

      <section className="summary-box">
        <h3>Booking Summary</h3>
        <p>✅ Accepted: {acceptedCount}</p>
        <p>❌ Rejected: {rejectedCount}</p>
        <p>⌛ Pending: {pendingCount}</p>
      </section>
    </div>
  );
};

export default HireDashboard;
