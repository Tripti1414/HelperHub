import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupWorker() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skills: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signed up:", form);
    navigate("/worker-dashboard");
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up as Worker</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input className="form-control mb-3" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input className="form-control mb-3" name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input className="form-control mb-3" name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <input className="form-control mb-3" name="skills" placeholder="Your Skills (e.g. Babysitting, Pet Care)" onChange={handleChange} required />
        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupWorker;
