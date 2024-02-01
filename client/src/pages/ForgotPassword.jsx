import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:3000/users/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  };

  return (
    <div>
      <div>
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
      </div>
    </div>
  );
}

export default ForgotPassword;
