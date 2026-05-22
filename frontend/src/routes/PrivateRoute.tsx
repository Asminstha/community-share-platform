import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// This will be used in routes to guard private pages
const PrivateRoute: React.FC = () => {
  const { user, loading } = useAuth();
  if (loading) return null; // Or a spinner

  // Redirect to login page if not authenticated
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};
export default PrivateRoute;