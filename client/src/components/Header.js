import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ user, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>🎬 OTT App</h1>
          </Link>
          
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/browse">Browse</Link>
            <Link to="/mylist">My List</Link>
          </nav>

          <div className="user-section">
            <div className="user-menu">
              <button 
                className="user-btn"
                onClick={() => setShowMenu(!showMenu)}
              >
                {user?.name || 'User'} ▼
              </button>
              {showMenu && (
                <div className="dropdown">
                  <a href="#profile">Profile</a>
                  <a href="#settings">Settings</a>
                  <button onClick={onLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
