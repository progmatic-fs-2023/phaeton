import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Login-Signup/Login.css';
import PropTypes from 'prop-types';
import getSomeYearsAgo from '../../utils/getSomeYearsAgo';
import AutoEmail from './AutoEmail';

function Login({ handleLogin, errorMsg }) {
  Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    errorMsg: PropTypes.string.isRequired,
  };
  const dialogRef = useRef(null);
  const dialog2Ref = useRef(null);
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const openDialog2 = () => {
    dialog2Ref.current.showModal();
    setIsLogin(true);
  };
  const closeDialog2 = () => {
    dialog2Ref.current.close();
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage('The passwords do not match.');
      return;
    }
    const check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/g;
    if (!password.match(check)) {
      setMessage(
        'A password should be 8 characters long and include uppercase and lowercase letters as well as numbers ',
      );
    } else {
      const response = await fetch('http://localhost:3000/users/guestusersignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
          IsGuestUser: false,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error);
      } else if (response.ok) {
        dialogRef.current.close();
        openDialog2();
        setTimeout(closeDialog2, 2000);
        setEmail('');
        setFirstName('');
        setLastName('');
        setDateOfBirth('');
        setPassword('');
        setPasswordConfirm('');
        setMessage('');
        AutoEmail({ firstName, lastName, email });
      }
    }
  };
  // HandleLogin ----
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setMessage(errorMsg);
    handleLogin(email, password);
  };
  const openDialog = () => {
    dialogRef.current.showModal();
    setIsLogin(true);
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  const handleSignUpClick = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
    setMessage('');
  };
  // pressing Escape button to close dialog box eventhandler
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDialog();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // click outside of window to close eventhandler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        closeDialog();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <button id="login-button" type="button" onClick={openDialog}>
        <span className="material-symbols-outlined">account_circle</span>

        <span>Login</span>
      </button>
      <dialog className="login-modal" ref={dialogRef}>
        {isLogin ? (
          <>
            <div className="login-header">
              <h1>Login</h1>
              <button className="nobg-btn" type="button" onClick={closeDialog}>
                ✖
              </button>
            </div>
            <form id="login-form" action="POST">
              <div className="login-container">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter e-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {message ? <p className="pw-error">{message}</p> : ''}

                {/* forgot password needs a ref later */}
                <NavLink onClick={closeDialog} to="forgot-password">
                  I forgot my password
                </NavLink>
              </div>
              <div>
                <button className="submit-btn" type="submit" onClick={handleLoginSubmit}>
                  Login
                </button>
              </div>
            </form>
            <p>
              No account?{' '}
              <button className="nobg-btn" type="button" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            {/* Sing up section */}
            <form id="sign-up-form" action="POST">
              {' '}
              <div className="login-header">
                <h1>Sign Up</h1>
                <button className="nobg-btn" type="button" onClick={closeDialog}>
                  ✖
                </button>
              </div>
              <div className="flex-column">
                <div className="flex-row">
                  <input
                    type="text"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    value={firstName}
                  />
                  <input
                    type="text"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    value={lastName}
                  />
                </div>
                <div className="flex-column">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <input
                    type="date"
                    id="date-of-birth"
                    name="date-of-birth"
                    placeholder="Date of Birth"
                    onFocus={(e) => {
                      e.target.type = 'date';
                    }}
                    onBlur={(e) => {
                      e.target.type = 'text';
                    }}
                    min={getSomeYearsAgo(99)}
                    max={getSomeYearsAgo(18)}
                    required
                    onChange={(event) => {
                      setDateOfBirth(event.target.value);
                    }}
                    value={dateOfBirth}
                  />

                  <div className="flex-row">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      placeholder="Enter password"
                      value={password}
                    />
                    <input
                      type="password"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      name="password"
                      placeholder="Confirm password"
                      value={passwordConfirm}
                    />
                  </div>
                  <p className="pw-error">{message || ''}</p>
                </div>
              </div>
              <div>
                <button className="submit-btn" type="submit" onClick={handleRegister}>
                  Sign Up
                </button>
              </div>
            </form>
            <p>
              Already have an account?{' '}
              <button className="nobg-btn" type="button" onClick={handleSignUpClick}>
                Login
              </button>
            </p>
          </>
        )}
      </dialog>
      <dialog className="registration-ok" ref={dialog2Ref}>
        <p>Register was successful, wait for the response Thanks.</p>
      </dialog>
    </>
  );
}

export default Login;
