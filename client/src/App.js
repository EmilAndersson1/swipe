import React, { useState, useEffect } from "react";

import { getUser } from "./api";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Swipe from "./pages/Swipe";
import Profile from "./pages/Profile";
import Page404 from "./pages/Page404";
import AboutUs from "./pages/AboutUs";
import SearchUser from "./pages/SearchUser";
import PrivateRouteSwipe from "./components/PrivateRouting/PrivateRouteSwipe";
import PrivateRouteLogin from "./components/PrivateRouting/PrivateRouteLogin";
import MoviePage from "./pages/MoviePage";

function App() {
  const [session, setSession] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetchedSession = await getUser();
      console.log(fetchedSession.data.username);
      console.log(session);
      fetchedSession.data.username ? setSession(true) : setSession(false);
    }
    fetchData();
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route
        exact
        path="/login"
        element={
          <PrivateRouteLogin session={session}>
            <Login setSession={setSession} />
          </PrivateRouteLogin>
        }
      />
      <Route
        exact
        path="/swipe"
        element={
          <PrivateRouteSwipe session={session}>
            <Swipe />
          </PrivateRouteSwipe>
        }
      />
      <Route exact path="/profile/:username" element={<Profile />} />
      <Route exact path="/movie/:movie" element={<MoviePage />} />
      <Route exact path="/about-us" element={<AboutUs />} />
      <Route exact path="/404" element={<Page404 />} />
      <Route
        exact
        path="/find-friends"
        element={
          <PrivateRouteSwipe session={session}>
            <SearchUser />
          </PrivateRouteSwipe>
        }
      />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
