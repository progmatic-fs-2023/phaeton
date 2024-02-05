import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../components/styles/Pages/ResetForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('black');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/users/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    await response.json();

    if (response.ok) {
      setColor('green');
      setMessage('Email was sent successfully, returning to the homepage...');
      setTimeout(() => navigate('/'), 3000);
    } else {
      setColor('red');
      setMessage('Something went wrong. Please try again!');
    }
  };

  return (
    <div className="forgot-password-dialog">
      <div className="forgot-password-content">
        <h1>Forgot Password?</h1>
        <label htmlFor="email">
          Enter your E-mail for the password change
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </label>
        <div className="response-container">
          <p style={{ color }}>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
