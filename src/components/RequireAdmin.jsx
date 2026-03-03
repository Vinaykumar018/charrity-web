// src/components/RequireAdmin.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const token = localStorage.getItem("adminToken");
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children;
}
