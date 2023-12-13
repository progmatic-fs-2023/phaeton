import React from 'react';
import './Header.css';
import eng from '../assets/header_pictures/eng.png';
import phaetonlogo from '../assets/header_pictures/phaetonlogo.png';
import Login from './Login';

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        {/* <a href="HOME PAGE"> */}
        <img src={phaetonlogo} alt="Logo" className="logo" />
      </div>
      <div className="login-container">
        <Login />
      </div>
      <div className="language-container">
        {/* ITT LENYÍLÓ MENÜ ÉS NYELVVÁLASZTÁS */}
        <img src={eng} alt="Language" className="language-icon" />
      </div>
    </header>
  );
}

export default Header;
