/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './Hamburger.css';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`Hamburger ${isOpen ? 'open' : ''}`}>
      <div className="close" onClick={toggleHamburger}>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Admin</a></li>
      </ul>
    </div>
  );
};

export default Hamburger;
