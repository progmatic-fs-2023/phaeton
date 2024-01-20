import React from 'react';
import '../styles/Login-Signup/Profile.css';
import { NavLink, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

function Profile({ userCtx }) {
  Profile.propTypes = { userCtx: PropTypes.oneOfType([PropTypes.object]).isRequired };
  const navigate = useNavigate();
  const openProfile = () => {
    document.getElementById('myDropdown').classList.toggle('show');
  };
  window.onclick = function myFn(event) {
    if (!event.target.matches('.profile-dropbtn')) {
      const dropdowns = document.getElementsByClassName('profile-dropdown-content');
      let i;
      for (i = 0; i < dropdowns.length; i += 1) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem('token');
    userCtx.setUser(null);
    window.location.reload(false);
    navigate('/');
  };
  return (
    <div className="profile-dropdown">
      <button type="button" onClick={openProfile} className="btn">
        <span className="material-symbols-outlined profile-dropbtn">account_circle</span>
      </button>

      <div id="myDropdown" className="profile-dropdown-content">
        <div className="profile-container-flex">
          <h3 className="welcome-msg">
            Welcome! {userCtx.user.firstName} {userCtx.user.lastName}
          </h3>
          <h4 className="welcome-msg">E-mail: {userCtx.user.email}</h4>
          <button type="button" onClick={handleLogOut} className="log-out-btn">
            <p>Log out</p>
          </button>
          <NavLink to="/profile">
            <button type="button" className="log-out-btn">
              <p>Profile</p>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Profile;
