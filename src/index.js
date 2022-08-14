import "bootswatch/dist/flatly/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App/App";
import Game from "./pages/Game/Game";
import GameEmpty from "./pages/Game/GameEmpty";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<GameEmpty />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
