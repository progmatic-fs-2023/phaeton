/* eslint-disable react/no-unescaped-entities */
import { NavLink } from 'react-router-dom';
import rentalPic from '../assets/home_page_nav_pictures/rentalpic.jpg';
import parkingPic from '../assets/home_page_nav_pictures/parkingpic.jpg';
import shuttlePic from '../assets/home_page_nav_pictures/shuttlepic.jpg';


import './styles/HomePageNav.css'

function HomePageNav() {
  return (
    <div className="home-page-container">
      <ul className="home-page-list">
        <li className="home-page-list-elem">
          <NavLink className="home-page-list-link" to="/rental">
            <img src={rentalPic} alt="Rental" />
            <div>
              <h1>Rental</h1>
              <p>Choose a Car for Your Needs</p>
            </div>
          </NavLink>
        </li>
        <li className="home-page-list-elem">
          <NavLink className="home-page-list-link" to="/parking">
            <img src={parkingPic} alt="Parking" />
            <div>
              <h1>Parking</h1>
              <p>Secure your Car While You're Away</p>
            </div>
          </NavLink>
        </li>
        <li className="home-page-list-elem">
          <NavLink className="home-page-list-link" to="/shuttle">
            <img src={shuttlePic} alt="Shuttle" />
            <div>
              <h1>Shuttle</h1>
              <p>Reliable Shuttle Service for Stress-Free Travel</p>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default HomePageNav;
