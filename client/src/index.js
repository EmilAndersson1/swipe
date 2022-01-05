import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import App from "./App";
import Login from "./pages/Login";
import Swipe from "./pages/Swipe";
import Profile from "./pages/Profile";
import Page404 from "./pages/Page404";
import AboutUs from "./pages/AboutUs";
import SearchUser from "./pages/SearchUser";

const root = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/swipe" element={<Swipe />} />
      <Route exact path="/profile/:username" element={<Profile />} />
      <Route exact path="/about-us" element={<AboutUs />} />
      <Route exact path="/404" element={<Page404 />} />
      <Route exact path="/find-friends" element={<SearchUser />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>,
  root
);
