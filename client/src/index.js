import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import App from "./App";
import Login from "./pages/Login";
import Swipe from "./pages/Swipe";
import Profile from "./pages/Profile";

import AboutUs from "./pages/AboutUs";

const root = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/swipe" element={<Swipe />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/about-us" element={<AboutUs />} />
    </Routes>
  </BrowserRouter>,
  root
);
