import React, { useState, useEffect, useRef } from 'react';
import './Login.css';

function Login() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dialogRef = useRef(null);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSignUpClick = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };
  // pressing Escape button to close dialog box eventhandler
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDialog();
      } else if (event.key === 'l' || event.key === 'L') {
        openDialog();
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
      <button type="button" onClick={openDialog}>
        Login
      </button>
      {isDialogOpen && (
        // if true, shows dialog
        <dialog open={isDialogOpen} ref={dialogRef}>
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
                  <input type="email" name="email" placeholder="Enter e-mail" />
                  <input type="password" name="password" placeholder="Enter password" />

                  {/* forgot password needs a ref later */}
                  <a className="forgot-password" href="http://localhost:5173/">
                    I forgot my password
                  </a>
                </div>
                <div>
                  <button className="submit-btn" type="submit">
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
                    <input type="text" name="firstName" placeholder="First name" />
                    <input type="text" name="lastName" placeholder="Last name" />
                  </div>
                  <div className="flex-column">
                    <input type="email" name="email" placeholder="Enter e-mail" />
                    <div className="flex-row">
                      <input type="password" name="password" placeholder="Enter password" />
                      <input type="password" name="password" placeholder="Confirm password" />
                    </div>
                  </div>
                </div>
                <div>
                  <button className="submit-btn" type="submit">
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
      )}
    </>
  );
}

export default Login;
