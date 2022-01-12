import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteSwipe = ({ children, session }) => {
  return session ? children : <Navigate to="/login" />;
};

export default PrivateRouteSwipe;
