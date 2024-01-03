import React, { useState, useEffect, useRef } from 'react';
import './styles/Login.css';
import loginButton from '../assets/login_button/login_button.svg';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const dialogRef = useRef(null);
  const dialog2Ref = useRef(null);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data) {
      dialogRef.current.close();
    }
  };

  const openDialog2 = () => {
    dialog2Ref.current.showModal();
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
    const response = await fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    const data = await response.json();

    if (data) {
      dialogRef.current.close();
      openDialog2();
      setTimeout(closeDialog2, 2000);
    }
  };

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  const handleSignUpClick = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
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
      <button className="login-button" type="button" onClick={openDialog}>
        <img src={loginButton} alt="login" />
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
            <form action="POST">
              <div className="login-container">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter e-mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* forgot password needs a ref later */}
                <a className="forgot-password" href="http://localhost:5173/">
                  I forgot my password
                </a>
              </div>
              <div>
                <button className="submit-btn" type="submit" onClick={handleLogin}>
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
            <form action="POST">
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
                  />
                  <input
                    type="text"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                  />
                </div>
                <div className="flex-column">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex-row">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      placeholder="Enter password"
                    />
                    <input
                      type="password"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      name="password"
                      placeholder="Confirm password"
                    />
                  </div>
                  {message || ''}
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
