import React from 'react';
import './styles/Profile.css';
import PropTypes from 'prop-types';

function Profile({ userCtx }) {
  Profile.propTypes = { userCtx: PropTypes.arrayOf(PropTypes.arrayOf).isRequired };
  const openProfile = () => {
    document.getElementById('myDropdown').classList.toggle('show');
  };
  window.onclick = function myFn(event) {
    if (!event.target.matches('.dropbtn')) {
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
  return (
    <div className="dropdown">
      <button type="button" onClick={openProfile} className="dropbtn">
        <span className="material-symbols-outlined dropbtn">account_circle</span>
      </button>

      <div id="myDropdown" className="dropdown-content">
        <p>{userCtx.user.firstName}</p>
      </div>
    </div>
  );
}

export default Profile;
