import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSignUpClick = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <>
      <div onClick={openDialog}>Login</div>
      {isDialogOpen && (
        // if true, shows dialog
        <dialog open={isDialogOpen}>
          {isLogin ? (
            <>
              <h3>Login</h3>
              <form action="POST">
                {
                  <>
                    <div className="input-container">
                      <input type="email" name="email" placeholder="Enter e-mail" />
                      <input type="password" name="password" placeholder="Enter password" />
                    </div>
                    <div>
                      <button className="login-btn" type="submit">
                        Login
                      </button>
                    </div>
                  </>
                }
              </form>
              <p>
                No account?{' '}
                <a href="#" onClick={handleSignUpClick}>
                  Sign Up
                </a>
              </p>
            </>
          ) : (
            <>
              {/* Sing up section */}
              <form action="POST">
                {' '}
                <h3>Sign Up</h3>
                {
                  <>
                    <div>
                      <div className="name-container">
                        <input type="text" name="firstName" placeholder="First name" />
                        <input type="text" name="lastName" placeholder="Last name" />
                      </div>
                      <div className="email-password-container">
                        <input type="email" name="email" placeholder="Enter e-mail" />
                        <input type="password" name="password" placeholder="Enter password" />
                        <input type="password" name="password" placeholder="Confirm password" />
                      </div>
                    </div>
                    <div>
                      <button className="login-btn" type="submit">
                        Login
                      </button>
                    </div>
                  </>
                }
              </form>
              <p>
                Already have an account?{' '}
                <a href="#" onClick={handleSignUpClick}>
                  Login
                </a>
              </p>
            </>
          )}
          <button onClick={closeDialog}>Cancel</button>
        </dialog>
      )}
    </>
  );
};

export default Login;
