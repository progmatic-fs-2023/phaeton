import React, { useState, useContext } from 'react';
import PhoneInput from 'react-phone-number-input';
import UserContext from '../contexts/UserContext';
import 'react-phone-number-input/style.css';
import '../components/styles/ServiceForm.css';

function ServiceForm() {
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  const [isLoggedIn] = useState(user !== 'GuestUser');

  const [email, setEmail] = useState(isLoggedIn ? user.email : '');
  const [firstName, setFirstName] = useState(isLoggedIn ? user.firstName : '');
  const [lastName, setLastName] = useState(isLoggedIn ? user.lastName : '');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();

  function getSomeYearsAgo(number) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - number);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <label id="serviceform-container" htmlFor="serviceform">
      <h2>Driver Details</h2>
      <form id="serviceform" name="serviceform">
        <label htmlFor="email">
          E-mail address*
          <input
            type="email"
            id="email"
            name="email"
            readOnly={isLoggedIn}
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            className={isLoggedIn ? 'logged-in' : ''}
          />
        </label>
        <label htmlFor="first-name">
          First Name*
          <input
            type="input"
            id="first-name"
            name="first-name"
            readOnly={isLoggedIn}
            required
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            value={firstName}
            className={isLoggedIn ? 'logged-in' : ''}
          />
        </label>
        <label htmlFor="last-name">
          Last Name*
          <input
            type="input"
            id="last-name"
            name="last-name"
            readOnly={isLoggedIn}
            required
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            value={lastName}
            className={isLoggedIn ? 'logged-in' : ''}
          />
        </label>
        <label htmlFor="date-of-birth">
          Date of Birth*
          <input
            type="date"
            id="date-of-birth"
            name="date-of-birth"
            min={getSomeYearsAgo(99)}
            max={getSomeYearsAgo(18)}
            required
            onChange={(event) => {
              setDateOfBirth(event.target.value);
            }}
            value={dateOfBirth}
          />
        </label>
        <div className='fake-label' htmlFor="phone-number">
          Phone Number (optional)
          <PhoneInput
            international
            id="phone-number"
            name="phone-number"
            placeholder="Enter phone number"
            countryCallingCodeEditable={false}
            defaultCountry="HU"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </label>
  );
}

export default ServiceForm;
