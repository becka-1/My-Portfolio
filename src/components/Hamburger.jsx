import React from 'react';
import './Hamburger.css';

const Hamburger = ({ isOpen, toggle }) => {
  return (
    <div className="hamburger-wrapper">
      <label htmlFor="check" className="menuButton">
        <input 
          id="check" 
          type="checkbox" 
          checked={isOpen} 
          onChange={toggle} 
        />
        <span className="top" />
        <span className="mid" />
        <span className="bot" />
      </label>
    </div>
  );
};

export default Hamburger;
