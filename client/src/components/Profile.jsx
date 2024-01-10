import React from 'react';
import './styles/Profile.css';
import PropTypes from 'prop-types';

function Profile({ userCtx }) {
  Profile.propTypes = { userCtx: PropTypes.arrayOf(PropTypes.arrayOf).isRequired };

  const openProfile = () => {
    document.getElementById('myDropdown').classList.toggle('show');
  };
  window.onclick = function myFn(event) {
    if (!event.target.matches('.profile-dropbtn')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
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
          <button type="button" className="log-out-btn">
            <p>Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
