import { UserContext } from "context/UserContext";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedUser = () => {
  const { user } = React.useContext(UserContext);
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export const ProtectedHome = () => {
  const { user, userLoading } = React.useContext(UserContext);
  if (userLoading) {
    return;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
