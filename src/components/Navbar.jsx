import React, { useState } from "react";
import { auth } from "../helper/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/game",
      text: "Game",
    },
  ];

  const checkActive = (tab) => {
    const path = window.location.pathname.split("/")[1];
    if (tab === path) {
      return "nav-link active";
    } else {
      return "nav-link";
    }
  };

  const goTo = (e) => {
    e.preventDefault();
    navigate(e.target.pathname);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" onClick={goTo}>
          LogiChess
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#myNavbar"
          aria-controls="myNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="navbar-nav flex-grow-1">
            {navItems.map(({ href, text }) => (
              <li className="nav-item" key={href}>
                <a
                  className={checkActive(href.slice(1))}
                  href={href}
                  onClick={goTo}
                >
                  {text}
                </a>
              </li>
            ))}
            <UserInfo checkActive={checkActive} goTo={goTo} />
          </ul>
        </div>
      </div>
    </nav>
  );
}

function UserInfo({ checkActive, goTo }) {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <li className="nav-item ms-auto">
      {user ? (
        <a href="/user" className={checkActive("user")} onClick={goTo}>
          {user.email ? user.email : `Anonymous ${user.uid.slice(0, 3)}`}
        </a>
      ) : (
        <a href="/login" className={checkActive("login")} onClick={goTo}>
          Login
        </a>
      )}
    </li>
  );
}

export default Navbar;
