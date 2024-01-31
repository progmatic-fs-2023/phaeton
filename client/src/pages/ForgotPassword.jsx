import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validáció és egyéb ellenőrzések

    try {
      const response = await fetch('http://localhost:3000/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Sikeres kérés esetén, kezelheted a választ
        const result = await response.json();
        console.log(result);
      } else {
        // Hiba esetén kezelheted a választ
        console.error('Failed to send password reset email');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <div>
        <h1>Forgot Password?</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your E-mail for the password change</label>
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
      </div>
    </div>
  );
}

export default ForgotPassword;
