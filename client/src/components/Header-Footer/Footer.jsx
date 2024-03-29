import React from 'react';
import '../styles/Header-Footer/footer.css';
import phoneIcon from '../../assets/footer/phone.svg';
import facebookIcon from '../../assets/footer/facebook.svg';
import instagramIcon from '../../assets/footer/instagram.svg';
import linkedinIcon from '../../assets/footer/linkedin.svg';
import mapIcon from '../../assets/footer/map.svg';
import mailIcon from '../../assets/footer/mail.svg';
import twitterIcon from '../../assets/footer/twitter.svg';
import { phoneNumber } from '../../pages/Shuttle';

export default function Footer() {
  return (
    <div className="main-container">
      <h3>Find us</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse expedita explicabo similique
        eligendi, pariatur magni cupiditate veritatis corporis autem id officiis repellat delectus
        vel, quos eaque sunt illo quasi deleniti quisquam minima. Alias molestiae id, nostrum
        voluptates at repellat quis itaque sit tenetur consectetur! Quas repellendus itaque
        voluptates amet quasi!
      </p>
      <ul>
        <li>
          <img src={phoneIcon} alt="phone" />
          <a className="phone-num" href={`tel:${phoneNumber}`}>
            {phoneNumber}
          </a>
        </li>
        <li>
          <img src={mailIcon} alt="email" />
          <p>PhaetonExample@email.com</p>
        </li>
        <li>
          <img src={mapIcon} alt="map" />
          <p>Latitude: 53.58342, Longitude: -112.32589, Distortion: 2.84</p>
        </li>
      </ul>
      <div className="icon-container">
        <a href="https://facebook.com">
          <img src={facebookIcon} alt="facebook" />
        </a>
        <a href="https://instagram.com">
          <img src={instagramIcon} alt="instagram" />
        </a>
        <a href="https://linkedin.com">
          <img src={linkedinIcon} alt="linkedin" />
        </a>
        <a href="https://twitter.com">
          <img src={twitterIcon} alt="twitter" />
        </a>
      </div>
    </div>
  );
}
