import React from 'react';
import './styles/Header.css';
import phaetonlogo from '../assets/header_pictures/phaetonlogo.png';
import Login from './Login';
import HeaderNav from './HeaderNav';

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        {/* <a href="HOME PAGE"> */}
        <img src={phaetonlogo} alt="Logo" className="logo" />
      </div>
      <div className="navigation-container">
        <HeaderNav />
      </div>
      <div className="login-container">
        <Login />
      </div>
    </header>
  );
}

export default Header;
