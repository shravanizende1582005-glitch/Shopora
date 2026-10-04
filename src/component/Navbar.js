import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";


function Navbar({ isMobile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const handleNavigation = (event, section) => {
    closeMenu();

    if (isMobile) {
      event.preventDefault();
      navigate(section === "home" ? "/" : `/${section}`);
    } else if (location.pathname !== "/") {
      event.preventDefault();
      navigate(`/#${section}`);
    }
  };

  return (
    <nav className="navbar">

      {/* Website Logo / Name */}
      <div className="navbar-logo">
        <a
          href={isMobile || location.pathname !== "/" ? "/" : "#home"}
          onClick={(event) => handleNavigation(event, "home")}
        >
          <img src={logo} alt="Shopora Logo" />
        </a>
      </div>

      <button
        className="navbar-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Navigation Links */}
      <div
        className={`navbar-links${menuOpen ? " is-open" : ""}`}
        id="primary-navigation"
      >

        <a href="#home" onClick={(event) => handleNavigation(event, "home")}>Home</a>

        <a href="#login" onClick={(event) => handleNavigation(event, "login")}>Login</a>

        

        <a href="#products" onClick={(event) => handleNavigation(event, "products")}>Products</a>

        <a href="#cart" onClick={(event) => handleNavigation(event, "cart")}>🛒 Cart</a>

        <a href="#feedback" onClick={(event) => handleNavigation(event, "feedback")}>Feedback</a>

      </div>

    </nav>
  );
}

export default Navbar;