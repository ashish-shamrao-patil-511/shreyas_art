import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="primary-navbar">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          <span className="brand-name">Shreyas Art</span>
        </Link>

        <button 
          className="menu-trigger"
          onClick={() => setMenuActive(!menuActive)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`nav-links ${menuActive ? 'show' : ''}`}>
          <li><Link to="/" onClick={() => setMenuActive(false)}>Home</Link></li>
          <li><Link to="/gallery" onClick={() => setMenuActive(false)}>Gallery</Link></li>
          <li><Link to="/blog" onClick={() => setMenuActive(false)}>Blog</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/admin" onClick={() => setMenuActive(false)}>Dashboard</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          ) : (
            <li><Link to="/admin/login" onClick={() => setMenuActive(false)} className="admin-link">Admin</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
