import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleChoiceSection.css";
import heroImg1 from "../assets/hire.jpg";
import heroImg2 from "../assets/gethired.jpg";

const RoleChoiceSection = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <section className="role-section" id="services">
      <h2 className="role-title">Choose Your Role</h2>
      <p className="role-subtitle">Continue as someone who wants to hire or work</p>

      <div className="role-buttons">
        <div className="role-option">
          <img src={heroImg1} alt="hire" />
          <button className="role-btn hire-btn" onClick={handleGoToLogin}>
            I Want to Hire
          </button>
        </div>
        <div className="role-option">
          <img src={heroImg2} alt="gethired" />
          <button className="role-btn apply-btn" onClick={handleGoToLogin}>
            I Want to Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoleChoiceSection;
