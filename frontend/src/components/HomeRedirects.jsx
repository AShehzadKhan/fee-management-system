import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomeRedirects = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate
      to={user.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
      replace
    />
  );
};

export default HomeRedirects;
