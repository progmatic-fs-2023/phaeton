import { NavLink } from 'react-router-dom';
import './styles/HeaderNav.css';

function HeaderNav() {
  return (
    <div className="header-nav-container">
      <NavLink className="header-nav-elem" to="/">
        Home
      </NavLink>
      <NavLink className="header-nav-elem" to="/rental">
        Rent
      </NavLink>
      <NavLink className="header-nav-elem" to="/parking">
        Parking
      </NavLink>
      <NavLink className="header-nav-elem" to="/shuttle">
        Shuttle
      </NavLink>
      <NavLink className="header-nav-elem" to="/contact">
        Contact
      </NavLink>
    </div>
  );
}

export default HeaderNav;
