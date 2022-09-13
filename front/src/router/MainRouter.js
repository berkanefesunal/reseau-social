import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home, Profile, Login, Register } from "pages";
import { ProtectedUser, ProtectedHome } from "./ProctedRoute";
const MainRouter = () => {
  return (
    <Routes>

      <Route element={<ProtectedHome />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<ProtectedUser />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default MainRouter;
