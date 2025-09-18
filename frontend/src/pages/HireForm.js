import React, { useContext, useState } from 'react';
import "./HireForm.css";
import { authContext } from '../context/auth.context';

const HireForm = ({ onSubmit }) => {
    const { userId } = useContext(authContext);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, name:formData.title, hireeId: userId });
    setFormData({
      title: "",
      category: "",
      description: "",
      location: "",
      date: "",
      time: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="hire-form">
      <input
        name="title"
        placeholder="Job Title"
        onChange={handleChange}
        value={formData.title}
        required
      />
      <select
        name="category"
        onChange={handleChange}
        value={formData.category}
        required
      >
        <option value="">Select Category</option>
        <option value="Pet Care">Pet Care</option>
        <option value="House Help">House Help</option>
        <option value="Academic">Academic</option>
        <option value="Tech Support">Tech Support</option>
      </select>
      <textarea
        name="description"
        placeholder="Job Description"
        onChange={handleChange}
        value={formData.description}
        required
      />
      <input
        name="location"
        placeholder="Job Location"
        onChange={handleChange}
        value={formData.location}
        required
      />
      <input
        type="date"
        name="date"
        onChange={handleChange}
        value={formData.date}
        required
      />
      <input
        type="time"
        name="time"
        onChange={handleChange}
        value={formData.time}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default HireForm;
