import React, { useState } from 'react';
import './Contact.css';
import axios from "axios";  
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
await axios.post("http://localhost:5000/api/contact", formData, {
  withCredentials: true, // since you enabled credentials in CORS
});
      alert("Message sent and saved!");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
    }
    // 🔐 Add backend integration here (e.g., POST request)
  };

  return (
    <section className="contact-section" id='contact'>
      <div className="contact-container">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <input 
            type="text" 
            name="subject" 
            placeholder="Subject" 
            value={formData.subject}
            onChange={handleChange}
            required 
          />
          <textarea 
            name="message" 
            rows="6" 
            placeholder="Your Message" 
            value={formData.message}
            onChange={handleChange}
            required 
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
