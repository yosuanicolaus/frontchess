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
    {
      href: "/login",
      text: "Login",
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
          <ul className="navbar-nav me-auto">
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
