/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"





const Header = () => {
  return (
    <div className="header">
      <div className="headerLeft">
        <img
          className="header__icon"
          src="/logo.png"
          alt="FilmyGyan Logo"
        />
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>

        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Most Ranked</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming Movies</span>
        </Link>
      </div>
      <div className="headerRight">
        <form className="searchForm">
          <input className="searchInput" type="text" placeholder="Search movies..." />
          <button className="searchButton" type="submit">
            Search
          </button>
        </form>
   <div className="headerRight">
   <Link to="/admin" style={{ textDecoration: "none" }}>
          <span>Admin</span>
        </Link>
        <a href="../Footer.jsx" style={{ textDecoration: "none" }}>
  <span>Contact Us</span>
</a>

   </div>
      </div>
    </div>
  )
}

export default Header
