// src/components/withAuth.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function withAuth(Component) {
  return function AuthWrapper(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await fetch("/api/auth/verify", {
            credentials: "include", // send cookies
          });

          if (!res.ok) throw new Error("Unauthorized");

          const data = await res.json();

          if (data.authenticated) {
            // Redirect based on role
            if (data.role === "worker") {
              navigate("/dashboard/worker");
            } else if (data.role === "hiree") {
              navigate("/dashboard/hiree");
            } else {
              navigate("/unauthorized");
            }
          } else {
            navigate("/");
          }
        } catch (err) {
          navigate("/");
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return <Component {...props} />;
  };
}
