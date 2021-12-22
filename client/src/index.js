import React from "react";
import { render } from "react-dom";
import App from "./App";
import Login from "./pages/Login";
import Swipe from "./pages/Swipe";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/swipe" element={<Swipe />} />
    </Routes>
  </BrowserRouter>,
  root
);
