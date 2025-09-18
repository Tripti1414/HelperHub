import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { toast } from "react-toastify";
import { registerApi } from "../api/auth.api";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [role, setRole] = useState('hiree');

  // extra fields for workers
  const [skills, setSkills] = useState(''); // comma separated string
  const [experience, setExperience] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prepare skills array (remove empty items)
    const skillsArray = skills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    try {
      // base registration payload
      const data = { username: name, email, password, role };

      // Option 1: include worker fields inside registration payload (if backend accepts it)
      if (role === 'worker') {
        data.skills = skillsArray;
        data.experience = experience;
      }

      const response = await registerApi(data);
      toast.success("Registered successfully!");
      if (role === 'worker') {
        console.log(response)
        const userId = response.data.user.id;

        const workerPayload = {
          worker:userId,
          skills: skillsArray,
          experience,
          
        };

        try {
          console.log(workerPayload)
          await axios.post("http://localhost:5000/api/workers/register", workerPayload);
        } catch (err) {
          console.warn("Worker profile creation failed:", err?.response?.data || err.message);
          toast.warn("Registered, but worker profile wasn't created automatically. You can add details later.");
        }
      }

      // clear and navigate
      setName('');
      setEmail('');
      setPassword('');
      setRole('hiree');
      setSkills('');
      setExperience('');

      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="hiree">Hiree</option>
          <option value="worker">Worker</option>
        </select>

        {/* worker-only fields */}
        {role === 'worker' && (
          <>
            <input
              name="skills"
              placeholder="Skills (comma separated) e.g. cooking, babysitting"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />

            <input
              name="experience"
              placeholder="Experience (e.g. 2 years, 6 months)"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit">Sign Up</button>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="clickable-text">
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
