// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your CSS file for styling

const Header = () => {
  return (
    <header className="header-container">
      <nav>
        <ul>
          <li>
            <Link to="/">Devices List</Link>
          </li>
          <li>
            <Link to="/add">Add Device</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
