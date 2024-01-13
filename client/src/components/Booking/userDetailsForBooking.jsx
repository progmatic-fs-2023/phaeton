// import React, { useState } from 'react';

const userDetailsForBooking = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = false;
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
  };

  // empty inputs
  const initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  // user in logged in, is auto filled
  const formValues = isLoggedIn ? userData : initialFormValues;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="user-booking">
      <form className="guest-user-inputs" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First name *"
          value={formValues.firstName}
          readOnly={!isLoggedIn}
          required={!isLoggedIn}
        />
        <input
          type="text"
          placeholder="Last name *"
          value={formValues.lastName}
          readOnly={!isLoggedIn}
          required={!isLoggedIn}
        />
        <input
          type="email"
          placeholder="Email *"
          value={formValues.email}
          readOnly={!isLoggedIn}
          required={!isLoggedIn}
        />

        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default userDetailsForBooking;
