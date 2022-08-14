import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

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
        <a className="navbar-brand" href="/">
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
            <li className="nav-item">
              <a className={checkActive("")} href="/" onClick={goTo}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className={checkActive("game")} href="/game" onClick={goTo}>
                Play
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
