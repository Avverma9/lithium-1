import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <img className="header__icon" src="/logo.png" alt="FilmyGyan Logo" />

      <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`menu ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={toggleMenu} className="navItem">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={toggleMenu}>
            About
          </Link>
        </li>
        <li>
          <Link to="/admin" onClick={toggleMenu}>
            Admin
          </Link>
        </li>
        <li>
          <a href="../Footer.jsx" onClick={toggleMenu}>
            Contact
          </a>
        </li>
      </ul>

      <div className="header__links">
        <Link to="/movies/popular">Popular</Link>
        <Link to="/movies/top_rated">Most Ranked</Link>
        <Link to="/movies/upcoming">Upcoming Movies</Link>
      </div>
    </nav>
  );
};

export default Header;
