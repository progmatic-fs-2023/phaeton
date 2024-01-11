import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/HeaderMobileNav.css';

function HeaderMobileNav() {

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleListItemClick = (value) => {
    dropdownRef.current.classList.remove('show');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        dropdownRef.current.classList.remove('show');
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="mobile-nav-dropdown">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => dropdownRef.current.classList.toggle('show')}
        className="mobile-nav-dropbtn"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
      <div ref={dropdownRef} id="myDropdown" className="mobile-nav-dropdown-content">
        <div className="mobile-header-nav-container">
          <button className="mobile-nav-elem" type="button" onClick={() => handleListItemClick()}>
            <NavLink className="mobile-header-nav-elem" to="/">
              Home
            </NavLink>
          </button>
          <button className="mobile-nav-elem" type="button" onClick={() => handleListItemClick()}>
            <NavLink className="mobile-header-nav-elem" to="/rental">
              Rent
            </NavLink>
          </button>
          <button className="mobile-nav-elem" type="button" onClick={() => handleListItemClick()}>
            <NavLink className="mobile-header-nav-elem" to="/parking">
              Parking
            </NavLink>
          </button>
          <button className="mobile-nav-elem" type="button" onClick={() => handleListItemClick()}>
            <NavLink className="mobile-header-nav-elem" to="/shuttle">
              Shuttle
            </NavLink>
          </button>
          <button className="mobile-nav-elem" type="button" onClick={() => handleListItemClick()}>
            <NavLink className="mobile-header-nav-elem" to="/contact">
              Contact
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderMobileNav;
