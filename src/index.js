import "bootswatch/dist/flatly/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App/App";
import Game from "./pages/Game/Game";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
