import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import PhoneInput from 'react-phone-number-input';
import UserContext from '../../contexts/UserContext';
import 'react-phone-number-input/style.css';
import '../../components/styles/Booking/ServiceForm.css';
import getSomeYearsAgo from '../../utils/getSomeYearsAgo';
import ServiceMessage from '../../components/Booking/ServiceMessage';
import fetchWithCheck from '../../utils/fetchWitchCheck';
import CarContext from '../../contexts/CarContext';
import BookingReceipt from '../../components/Booking/BookingReceipt';

function ServiceFormForRent() {
  const userCtx = useContext(UserContext);
  const { startDate, endDate, carId } = useParams();
  const carCtx = useContext(CarContext);
  const navigate = useNavigate();
  function dateFormatterWithHyphen(value) {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const { carData } = carCtx;
  const { user } = userCtx;
  const [isLoggedIn] = useState(user !== 'GuestUser');
  const [email, setEmail] = useState(isLoggedIn ? user.email : '');
  const [firstName, setFirstName] = useState(isLoggedIn ? user.firstName : '');
  const [lastName, setLastName] = useState(isLoggedIn ? user.lastName : '');
  const [dateOfBirth, setDateOfBirth] = useState(
    isLoggedIn ? dateFormatterWithHyphen(user.dateOfBirth) : '',
  );
  const [phoneNumber, setPhoneNumber] = useState();
  const [message, setMessage] = useState('');
  const [IsVisible, setIsVisible] = useState('non-visible');
  const [isBlurred, setIsBlurred] = useState('');
  const [isOnThisSite, setIsOnThisSite] = useState(true);

  function successfullBooking() {
    setIsVisible('visible');
    setIsBlurred('blurred');
    setMessage('Car Rented Successfully');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }
  useEffect(() => {
    if (!carData) {
      navigate('/rental');
    }
  }, [carData]);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const e = event;
      const newMessage =
        'You have unsaved changes. If you leave the page, your changes will be lost.';
      e.returnValue = newMessage; // Standard for most browsers
      setIsOnThisSite(false);
      return message; // For some older browsers
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      // EventListener eltávolítása
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isOnThisSite]);
  const onSubmit = (event) => {
    event.preventDefault();
    async function loggedInUserRenting(carIdValue, startDateValue, endDateValue, phoneNumberValue) {
      const url = `http://localhost:3000/rental/date/${carIdValue}`;
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userCtx.user.id,
          ServiceStartDate: startDateValue,
          ServiceEndDate: endDateValue,
          PhoneNumber: phoneNumberValue,
        }),
      };
      await fetchWithCheck(url, options);
      BookingReceipt({
        user,
        carData,
        startDateValue,
        endDateValue,
        // phoneNumberValue,
        service: 'rental',
      });
      successfullBooking();
    }

    async function guestUserRenting(
      emailValue,
      passwordValue,
      firstNameValue,
      lastNameValue,
      dateOfBirthValue,
      IsGuestUser,
      carIdValue,
      startDateValue,
      endDateValue,
      phoneNumberValue,
    ) {
      let userData;
      const signupUrl = 'http://localhost:3000/users/signup';
      const signupOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          firstName: firstNameValue,
          lastName: lastNameValue,
          dateOfBirth: dateOfBirthValue,
          IsGuestUser,
        }),
      };
      try {
        userData = await fetchWithCheck(signupUrl, signupOptions);
      } catch (error) {
        const loginUrl = 'http://localhost:3000/users/login';
        const loginOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailValue, password: passwordValue, IsGuestUser }),
        };
        userData = await fetchWithCheck(loginUrl, loginOptions);
      }
      const rentalUrl = `http://localhost:3000/rental/date/${carIdValue}`;
      const rentalOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userData.user.id,
          ServiceStartDate: startDateValue,
          ServiceEndDate: endDateValue,
          PhoneNumber: phoneNumberValue,
        }),
      };
      await fetchWithCheck(rentalUrl, rentalOptions);
      BookingReceipt({
        user: {
          email: emailValue,
          firstName: firstNameValue,
          lastName: lastNameValue,
        },
        carData,
        startDateValue,
        endDateValue,
        // phoneNumberValue,
        service: 'rental',
      });
      successfullBooking();
    }

    if (isLoggedIn) {
      loggedInUserRenting(carId, startDate, endDate, phoneNumber);
    } else {
      guestUserRenting(
        email,
        'GuestUser',
        firstName,
        lastName,
        dateOfBirth,
        true,
        carId,
        startDate,
        endDate,
        phoneNumber,
      );
    }
  };

  return (
    <div>
      <label id="serviceform-container" className={isBlurred} htmlFor="serviceform">
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
      <div className={IsVisible}>
        <ServiceMessage message={message} />
      </div>
    </div>
  );
}

export default ServiceFormForRent;
