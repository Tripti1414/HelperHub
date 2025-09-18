import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './WorkDashboard.css';
import { logoutApi } from '../api/auth.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/auth.context';

const WorkerDashboard = () => {
  const { user, userId } = useContext(authContext);
  const workerId = userId;
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch available jobs and worker applications
  const fetchData = async () => {
    try {
      const [jobRes, appRes] = await Promise.all([
        axios.get('http://localhost:5000/api/requests'),
        axios.get(`http://localhost:5000/api/applications/${workerId}`)
      ]);
      setJobs(jobRes.data);
      setApplications(appRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Auto-refresh applications every 3 seconds for real-time status updates
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [workerId]);

  // Apply to a job
  const handleApply = async (jobId, category) => {
    try {
      await axios.post('http://localhost:5000/api/applications/', {
        worker: workerId,
        request: jobId,
        category
      });

      await axios.post(`http://localhost:5000/api/requests/${jobId}/apply`, {
        workerId: workerId,
        name: user.username
      });

      toast.success('Application sent!');
      fetchData(); // Refresh jobs and applications
    } catch (err) {
      console.error('Error applying:', err);
      toast.error('Failed to apply for job.');
    }
  };

  // Check if worker already applied
  const alreadyApplied = (job) => {
    return job.applicants?.some(a => a.workerId.toString() === workerId);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logoutApi();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (e) {
      console.error("Error logging out:", e);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="worker-dashboard">
      <div className="dashboard-header">
        <h2>Worker Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">LogOut</button>
      </div>

      <section>
        <h3>Available Jobs</h3>
        <ul>
          {jobs.map(job => (
            <li key={job._id} className="job-card">
              <strong>{job.category}</strong> - {job.description}
              {!alreadyApplied(job) ? (
                <button onClick={() => handleApply(job._id, job.category)}>Apply</button>
              ) : (
                <span>Already Applied</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Application Status</h3>
        {applications.length > 0 ? (
          <ul>
            {applications.map(app => (
              <li key={app._id} className={`status-card ${app.status}`}>
                Job: {app.request?.category || 'N/A'} — 
                <strong>
                  {app.status === 'applied' && 'Pending'}
                  {app.status === 'accepted' && 'Accepted ✅'}
                  {app.status === 'rejected' && 'Rejected ❌'}
                </strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>No applications yet.</p>
        )}
      </section>
    </div>
  );
};

export default WorkerDashboard;
