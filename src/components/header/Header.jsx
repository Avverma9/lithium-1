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
          src="https://o.remove.bg/downloads/a7ddbe5c-40ef-4eaf-ad85-eaff5cb755a9/filmy-gyan-1645096309-removebg-preview.png"
          alt="FilmyGyan Logo"
        />
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Famous</span>
        </Link>

        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming Masala</span>
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
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span>Contact Us</span>
        </Link>
   </div>
      </div>
    </div>
  )
}

export default Header
