import React from "react";
import "./HeroSection.css";
import heroImg from "../assets/hire1.png";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const handleGoToSignUp = () => {
    navigate("./signup");
  };

  return (
    <section className="hero" id="home">
      <div className="hero-text">
        <h1>Hire Trusted Helpers for Any Task, Anytime!</h1>
        <p>
          Your one-stop platform to find reliable people for everyday needs.
          Connect with verified professionals in minutes and get things done
          without stress. From pet care to tech help — find reliable support in
          minutes.
        </p>

        <button className="hero-btn" onClick={handleGoToSignUp}>
          Get Started
        </button>
      </div>

      <div className="hero-img">
        <img src={heroImg} alt="People helping each other" />
      </div>
    </section>
  );
}

export default HeroSection;
