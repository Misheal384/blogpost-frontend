import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // For navigation after logout

  // Check authentication status on component mount
  useEffect(() => {
    const userToken = localStorage.getItem('token'); // Use the same key from Login.jsx
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsAuthenticated(false); // Update authentication state
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav>
      <div className='container nav__container'>
        <Link to="/" className='nav__logo'>
          <img src="/images/logo.png" alt="Misheal Logo" />
        </Link>
        <ul className='nav__menu'>
          {isAuthenticated ? (
            <>
              <li><Link to="/profile">Misheal</Link></li>
              <li><Link to="/create">Create Post</Link></li>
              <li>
                <button
                  onClick={handleLogout}
                  className='nav__button'
                  aria-label="Logout"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Signup</Link></li> {/* Optionally add signup */}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
