import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getUserApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const authContext = createContext();
const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
  
  const getUser = async () => {
    try {
      const res = await getUserApi();
      setUser(res.data);
      setUserId(res.data.userId);
      console.log(res.data)
      if (res.status === 200) {
        setIsAuthenticated(true);
        setRole(res.data.role);
        if (res.data.role === "worker") {
          toast.success("Navigating to Worker Dashboard");
          navigate("/dashboard-work");
        } else {
          toast.success("Welcome Hiree");
          navigate("/dashboard-hire");
        }
      } else {
        setIsAuthenticated(false);
        navigate("/");
      }
    } catch (e) {
      console.error("Error fetching user data:", e);
      setIsAuthenticated(false);
      navigate("/");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("hiree");
  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        role,
        setRole,
        user,
        userId,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
