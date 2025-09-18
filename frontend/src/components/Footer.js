import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        {/* <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We connect you with trusted professionals for tasks ranging from pet care to tech support.
            Your convenience is our mission.
          </p>
        </div> */}

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#services">Hire</a></li>
            {/* <li><a href="#explore">Explore Workers</a></li> */}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: triptipal1414@gmail.com</p>
          <p>Phone: +91 9779334680</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target='_blank'><FaFacebook /></a>
            <a href="https://www.instagram.com" target='_blank'><FaInstagram /></a>
            <a href="https://www.twitter.com" target='_blank'><FaTwitter /></a>
            <a href="https://www.linkedin.com" target='_blank'><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HelperHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
