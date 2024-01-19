import React, { useEffect, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header-Footer/HeaderMobileNav.css';

function HeaderMobileNav() {

  const sidenavRef = useRef(null);
  const buttonRef = useRef(null);


  const closeNav = useCallback(() => {
    sidenavRef.current.classList.remove('show-sidenav')
    setTimeout(() => {
      document.getElementById('overlay').style.display = 'none';
    }, 200);
  }, []);

  function openNav() {
    // I don't know why, but with the 0ms setTimeout function the effect works
    setTimeout(() => {
      sidenavRef.current.classList.toggle('show-sidenav')
    }, 0);
    document.getElementById('overlay').style.display = 'block';
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sidenavRef.current &&
        !sidenavRef.current.contains(event.target) &&
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
        <div ref={sidenavRef}  className="sidenav">
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
