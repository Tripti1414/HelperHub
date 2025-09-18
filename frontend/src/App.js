import React, { useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import HeroSection from "./components/HeroSection.js";
import RoleChoiceSection from "./components/RoleChoiceSection.jsx";
import Footer from "./components/Footer.js";

import About from './components/About.js';
import Contact from './components/Contact.js';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import HireDashboard from "./pages/HireDashboard.jsx";
import WorkDashboard from "./pages/WorkDashboard.jsx";
import HireForm from "./pages/HireForm.js";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  const roleRef = useRef(null);
  const location = useLocation();

  const scrollToRoleSection = () => {
    roleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Hide Navbar on these routes
  const hideNavbarRoutes = ["/dashboard-hire", "/dashboard-work"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);


  return (
    <>
      {shouldShowNavbar && <Navbar onGetStarted={scrollToRoleSection} />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <div ref={roleRef}>
                <RoleChoiceSection />
              </div>
              <About />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard-hire" element={<HireDashboard />} />

        <Route path="/dashboard-work" element={
      
        <WorkDashboard />
  
    }
 />
        <Route path="/hireform" element={<HireForm />} />
      </Routes>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
