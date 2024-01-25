import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import UserContext from '../../contexts/UserContext';
import '../../components/styles/Pages/ProfilePage.css';
import dateFormatterWithHyphen from '../../hooks/dateFromatterWhitHyphen';
function Profile() {
  const navigate = useNavigate();

  const userCtx = useContext(UserContext);
  if (userCtx.user === 'GuestUser') {
    useEffect(() => {
      navigate('/');
    }, []);
  }

  return (
    <>
      <div className="profile-data-container">
        <h2>Profile</h2>

        <h3>
          <p>First name: {userCtx.user.firstName} </p>
        </h3>
        <h3>
          <p>Last name: {userCtx.user.lastName} </p>
        </h3>
        <h3>
          <p>E-mail address: {userCtx.user.email} </p>
        </h3>
        <h3>
          <p>Date of birth: {dateFormatterWithHyphen(userCtx.user.dateOfBirth)} </p>
        </h3>
      </div>
    </>
  );
}

export default Profile;
