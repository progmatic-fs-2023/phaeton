/* eslint-disable react/no-unescaped-entities */
import { NavLink } from 'react-router-dom';
import useDocumentTitle from '../components/useDocumentTitle';

import '../components/styles/Pages/Home.css';

function Home() {
  useDocumentTitle('Phaeton · Home');
  return (
    <div className="home-page-container">
      <div className="home-page-list">
        <div className="home-page-list-elem background-pic rental">
          <NavLink className="home-page-list-link" to="/rental">
            <div>
              <h1>Rental</h1>
              <p>Choose a Car for Your Needs</p>
            </div>
          </NavLink>
        </div>
        <div className="home-page-list-elem background-pic parking">
          <NavLink className="home-page-list-link" to="/parking">
            <div>
              <h1>Parking</h1>
              <p>Secure your Car While You're Away</p>
            </div>
          </NavLink>
        </div>
        <div className="home-page-list-elem background-pic shuttle">
          <NavLink className="home-page-list-link" to="/shuttle">
            <div>
              <h1>Shuttle</h1>
              <p>Reliable Shuttle Service for Stress-Free Travel</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
