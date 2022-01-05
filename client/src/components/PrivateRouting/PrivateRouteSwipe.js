import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../../api";

const PrivateRouteSwipe = ({ children }) => {
  const [session, setSession] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const fetchedSession = await getUser();
      fetchedSession.data.username ? setSession(true) : setSession(false);
    }
    fetchData();
  }, []);

  return session ? children : <Navigate to="/login" />;
};

export default PrivateRouteSwipe;
