import React, { useContext, useState } from 'react';
import './styles/Header.css';
import phaetonlogo from '../assets/header_pictures/phaetonlogo.png';
import Login from './Login';
import Profile from './Profile';
import HeaderNav from './HeaderNav';
import UserContext from '../contexts/UserContext';

function Header() {
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
    }
  };
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
        {userCtx.user ? (
          <Profile userCtx={userCtx} />
        ) : (
          <Login handleLogin={handleLogin} errorMsg={errorMsg} />
        )}
      </div>
    </header>
  );
}

export default Header;
