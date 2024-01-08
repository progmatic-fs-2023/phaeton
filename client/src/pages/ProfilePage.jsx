import React, { useContext } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import UserContext from '../contexts/UserContext';
import '../components/styles/ProfilePage.css';

function Profile() {
  const userCtx = useContext(UserContext);
  if (!userCtx.user) {
    return <LoadingScreen />;
  }
  return (
    <div className="profile-page-container">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="profile-data-container">
        <h3>
          {' '}
          <p>First name: </p> {userCtx.user.firstName}
        </h3>
        <h3>
          <p>Last name: </p> {userCtx.user.lastName}
        </h3>
        <h3>
          <p>E-mail address: </p> {userCtx.user.email}
        </h3>
      </div>
      <div className="profile-menubar">
        <button type="button" className="profile-btn">
          Services
        </button>
        <button type="button" className="profile-btn">
          Services
        </button>
        <button type="button" className="profile-btn">
          Services
        </button>
        <button type="button" className="profile-btn">
          Services
        </button>
        <button type="button" className="profile-btn">
          Services
        </button>
        <button type="button" className="profile-btn">
          Services
        </button>
      </div>
    </div>
  );
}

export default Profile;