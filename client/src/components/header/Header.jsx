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
        <img
          className="header__icon"
          src="/logo.png"
          alt="FilmyGyan Logo"
        />

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
        <Link to="/admin"  onClick={toggleMenu} >
        Admin
          </Link>
        </li>
        <li>
        <Link to="/movies/popular" onClick={toggleMenu}>
        Popular
          </Link>
        </li>
        <li>
        <Link to="/movies/top_rated" onClick={toggleMenu}>
        Most Ranked
          </Link>
        </li>
        <li>
        <Link to="/movies/upcoming" onClick={toggleMenu}>
        Upcoming Movies
          </Link>
        </li>
       
        <li>
        <a href="../Footer.jsx" onClick={toggleMenu}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
