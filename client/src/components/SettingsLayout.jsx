import { React, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

function SettingsLayout() {
  const navigate = useNavigate();

  const userCtx = useContext(UserContext);
  if (userCtx.user === 'GuestUser') {
    useEffect(() => {
      navigate('/');
    }, []);
  }
  return (
    <>
      <div className="profile-header">
        <h1>Settings</h1>
      </div>
      <div className="profile-page-container">
        <div className="profile-menubar">
          <NavLink to="profile">
            <button type="button" className="profile-btn">
              Profile
            </button>
          </NavLink>
          <NavLink to="rentservices">
            <button type="button" className="profile-btn">
              Rented Cars
            </button>
          </NavLink>
          <NavLink to="parkingservices">
            <button type="button" className="profile-btn">
              Booked ParkingLots
            </button>
          </NavLink>
        </div>
        <Outlet />
        <div className="profile-menubar1" />
      </div>
    </>
  );
}

export default SettingsLayout;
