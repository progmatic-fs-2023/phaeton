import React, { useState, useContext } from 'react';
import { useParams } from 'react-router';
import PhoneInput from 'react-phone-number-input';
import UserContext from '../contexts/UserContext';
// import ParkingDetailsContext from '../contexts/ParkingDetailsContext';
import 'react-phone-number-input/style.css';
import '../components/styles/Booking/ServiceForm.css';
import getSomeYearsAgo from '../hooks/getSomeYearsAgo';

function ServiceFormForRent() {
  const userCtx = useContext(UserContext);
  // const parkingCtx = useContext(ParkingDetailsContext);

  const { startDate, endDate, carId } = useParams();

  function dateFormatterWithHyphen(value) {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const { user } = userCtx;
  const [isLoggedIn] = useState(user !== 'GuestUser');
  const [email, setEmail] = useState(isLoggedIn ? user.email : '');
  const [firstName, setFirstName] = useState(isLoggedIn ? user.firstName : '');
  const [lastName, setLastName] = useState(isLoggedIn ? user.lastName : '');
  const [dateOfBirth, setDateOfBirth] = useState(
    isLoggedIn ? dateFormatterWithHyphen(user.dateOfBirth) : '',
  );
  const [phoneNumber, setPhoneNumber] = useState();
  console.log(dateOfBirth);

  const onSubmit = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      fetch(`http://localhost:3000/rental/date/${carId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userCtx.user.id,
          ServiceStartDate: startDate,
          ServiceEndDate: endDate,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('a regisztráció volt szar');
          }
          return response.json();
        })
        .then((data) => {
          console.log('nice');
          console.log(data);
        })
        .catch((error) => {
          <div>{`There has been a problem with your fetch operation: ${error}`}</div>;
        });
    } else {
      fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: 'GuestUser',
          firstName,
          lastName,
          dateOfBirth,
          IsGuestUser: true,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('ide eljutott');
          console.log(data);
          fetch(`http://localhost:3000/rental/date/${carId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userID: data.user.id,
              ServiceStartDate: startDate,
              ServiceEndDate: endDate,
              PhoneNumber: phoneNumber,
            }),
          })
            .then((res) => {
              console.log('ide is');
              if (!res.ok) {
                console.log(res);
                throw new Error('a bérlés volt szar');
              }
              return res.json();
            })
            .then((data) => {
              console.log('nice');
              console.log(data);
            })
            .catch((error) => {
              <div>{`There has been a problem with your fetch operation: ${error}`}</div>;
            });
        });
    }
  };

  return (
    <label id="serviceform-container" htmlFor="serviceform">
      <h2>Driver Details</h2>
      <form id="serviceform" name="serviceform" onSubmit={(event) => onSubmit(event)}>
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
            readOnly={isLoggedIn}
            className={isLoggedIn ? 'logged-in' : ''}
          />
        </label>
        <div className="fake-label" htmlFor="phone-number">
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

export default ServiceFormForRent;
