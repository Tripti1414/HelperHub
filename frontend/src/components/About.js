import React from 'react';
import './About.css';
import about from "../assets/aboutus.jpg";
const About = () => {
  return (
    <section className="about-section" id='about'>
      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">Who We Are</p>
        <div className="about-content">
          <div className="about-text">
            <p>
              Welcome to <strong>HelperHub</strong>, where we connect people with amazing services!
              Our platform allows users to hire skilled individuals for personal and professional tasks.
            </p>
            <p>
              Our mission is to make daily tasks easier and more efficient. Whether you need pet care, house help,
              academic support, or tech assistance — we've got someone for you.
            </p>
            <p>
              We are a passionate team committed to quality, trust, and simplicity. Join us and be part of
              a fast-growing community making lives easier every day.
            </p>
          </div>
          <div className="about-image">
            <img src={about} alt="Our Team" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
