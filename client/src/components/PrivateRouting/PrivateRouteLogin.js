import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../../api";

const PrivateRouteLogin = ({ children }) => {
  const [session, setSession] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const fetchedSession = await getUser();
      fetchedSession.data.username ? setSession(false) : setSession(true);
    }
    fetchData();
  }, []);

  return session ? children : <Navigate to="/" />;
};

export default PrivateRouteLogin;
