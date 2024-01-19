import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header-Footer/Header.css';
import phaetonlogo from '../../assets/header_pictures/phaetonlogo.png';
import Login from '../Login-Signup/Login';
import Profile from '../Login-Signup/Profile';
import HeaderNav from './HeaderNav';
import HeaderMobileNav from './HeaderMobileNav';
import UserContext from '../../contexts/UserContext';

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [errorMsg, setErrorMsg] = useState('');
  const userCtx = useContext(UserContext);
  const handleLogin = async (email, password) => {
    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setErrorMsg(data.message);
    } else if (response.ok) {
      userCtx.setUser(data.user);
      localStorage.setItem('token', data.token);
      window.location.reload(false)
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if(windowWidth >= 1270) {
  return (
    <header className="header">
      <div className="logo-container">
      <NavLink className="mobile-header-nav-elem" to="/">         
        <img src={phaetonlogo} alt="Logo" className="logo" />
            </NavLink>
      </div>
      <div className="navigation-container">
        <HeaderNav />
      </div>
      <div className="login-container">
        {userCtx.user === "GuestUser" ? (
          <Login handleLogin={handleLogin} errorMsg={errorMsg} />
          ) : (
          <Profile userCtx={userCtx} />
        )}
      </div>
    </header>
  );
}
  return (
    <header className="header">
    <div className="navigation-container">
      <HeaderMobileNav />
    </div>
    <div className="logo-container">
    <NavLink className="mobile-header-nav-elem" to="/">         
      <img src={phaetonlogo} alt="Logo" className="logo" />
          </NavLink>
    </div>
    <div className="login-container">
    {userCtx.user === "GuestUser" ? (
          <Login handleLogin={handleLogin} errorMsg={errorMsg} />
          ) : (
          <Profile userCtx={userCtx} />
        )}
    </div>
  </header>
  );
}

export default Header;
