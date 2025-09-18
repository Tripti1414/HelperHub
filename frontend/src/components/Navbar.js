import React from "react";
import "./Navbar.css";
import hireImg from "../assets/hire.jpg";
import getHiredImg from "../assets/gethired.jpg";

function Navbar({ onGetStarted, onHireScroll, onWorkerScroll }) {
  return (
    <>
      <nav className="navbar-wrapper">
        <div className="navbar">
          <div className="logo">HelperHub</div>

          <ul className="nav-links">
            {["Home", "Services",  "About", "Contact"].map(
              (text) => (
                <li key={text}>
                  <a href={`#${text.toLowerCase()}`}>{text}</a>
                </li>
              )
            )}
          </ul>

          {/* <button className="nav-btn" onClick={onGetStarted}>
            Get Started
          </button> */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
