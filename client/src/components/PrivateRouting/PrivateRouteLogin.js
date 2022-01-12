import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteLogin = ({ children, session }) => {
  return !session ? children : <Navigate to="/" />;
};

export default PrivateRouteLogin;
