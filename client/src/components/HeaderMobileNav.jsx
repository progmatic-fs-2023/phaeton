import React, { useEffect, useRef, useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/HeaderMobileNav.css';

function HeaderMobileNav() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let sideNavWidth;

  if (windowWidth > 600) {
    sideNavWidth = '250px';
  } else {
    sideNavWidth = '180px';
  }

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeNav = useCallback(() => {
    document.getElementById('mySidenav').style.width = '0';
    setTimeout(() => {
      document.getElementById('overlay').style.display = 'none';
    }, 200);
  }, []);

  function openNav() {
    // I don't know why, but with the 0ms setTimeout function the effect works
    setTimeout(() => {
      document.getElementById('mySidenav').style.width = sideNavWidth;
    }, 0);
    document.getElementById('overlay').style.display = 'block';
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeNav();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [closeNav]);

  return (
    <div>
      <div id="overlay">
        <div ref={dropdownRef} id="mySidenav" className="sidenav">
          <button type="button" className="mobile-nav-button" onClick={closeNav}>
            &times;
          </button>
          <NavLink className="mobile-header-nav-elem" to="/" onClick={closeNav}>
            Home
          </NavLink>
          <NavLink className="mobile-header-nav-elem" to="/rental" onClick={closeNav}>
            Rent
          </NavLink>
          <NavLink className="mobile-header-nav-elem" to="/parking" onClick={closeNav}>
            Parking
          </NavLink>
          <NavLink className="mobile-header-nav-elem" to="/shuttle" onClick={closeNav}>
            Shuttle
          </NavLink>
          <NavLink className="mobile-header-nav-elem" to="/contact" onClick={closeNav}>
            Contact
          </NavLink>
        </div>
      </div>
      <div>
        <button ref={buttonRef} className="mobile-nav-button" type="button" onClick={openNav}>
          &#9776;
        </button>
      </div>
    </div>
  );
}

export default HeaderMobileNav;
