import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginApi } from "../api/auth.api";
import { toast } from "react-toastify";

const Login = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('');
  


  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/Signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = { email: Email, password: Password };
      const response = await loginApi(data);
      const role = response.data.user.role;
      console.log(role);
      
 localStorage.setItem("user", JSON.stringify(response.data.user));
localStorage.setItem("token", response.data.token || "");


      toast.success("Login Successfullysdfkm")
       if (role === "worker") {
      navigate("/dashboard-work");
    } else if (role === "hiree") {

      navigate("/dashboard-hire");
    }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
   
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back, Hiree!</h2>
        <p>Please log in to your account</p>

        {/* ✅ FIX: Attach handleLogin here */}
        <form className="login-form" onSubmit={handleLogin}>
          <input value={Email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder="Email" required />
          <input value={Password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" required />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don’t have an account?{" "}
          <span onClick={handleSignupClick}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
