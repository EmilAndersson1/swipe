import React from "react";
import { render } from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
    </Routes>
  </BrowserRouter>,
  root
);
