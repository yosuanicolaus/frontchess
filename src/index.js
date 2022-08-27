import "bootswatch/dist/flatly/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App/App";
import Game from "./Game/Game";
import GameCreate from "./Game/GameCreate";
import Navbar from "./components/Navbar";
import Login from "./User/Login";
import Test from "./components/Test";
import { AuthProvider } from "./helper/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <main className="d-flex flex-column min-vh-100">
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/game" element={<GameCreate />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
      </Router>
    </AuthProvider>
  </main>
);
