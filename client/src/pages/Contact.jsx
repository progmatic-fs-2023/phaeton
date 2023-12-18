import React from 'react';
import '../components/styles/Contact.css';
import mapIcon from '../assets/footer/map.svg';
import mailIcon from '../assets/footer/mail.svg';
import phoneIcon from '../assets/footer/phone.svg';
import { phoneNumber } from './Shuttle';

function Contact() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef(null);
  const [dialogMessage, setDialogMessage] = useState(null);
  const dialog = document.querySelector('.contact-modal');

  const openDialog = () => {
    dialog.showModal();
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_MAIL_SERVICE_ID,
        import.meta.env.VITE_MAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_API_PUBLIC_KEY,
      )
      .then(
        () => {
          setDialogMessage('Email was sent successfully');
          openDialog();
        },
        () => {
          setDialogMessage('Something went wrong, please try again later.');
          openDialog();
        },
      );
    e.target.reset();
  };

  return (
    <div className="contact-main-container">
      <div className="form-container">
        <h3>Contact us</h3>
        <form action="post">
          <label htmlFor="email">
            E-mail : <br />
            <input id="email" placeholder="E-mail..." name="email" type="email" required />
          </label>
          <br />
          <label htmlFor="name">
            Name : <br />
            <input id="name" placeholder="Name..." type="text" />
          </label>
          <textarea placeholder="Message..." className="text-area" type="text" required />
          <input type="submit" value="Send" />
        </form>
      </div>
      <div className="list-container">
        <ul>
          <li>
            <img src={phoneIcon} alt="phone" />
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21588.920383255554!2d19.209896972484184!3d47.438949132283994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741c1853f7670cb%3A0x8dc29c061f7cddb3!2sBudapest%2C%20Ferihegy!5e0!3m2!1shu!2shu!4v1702581603529!5m2!1shu!2shu"
          width="300"
          height="300"
          title="gmap"
        />
      </div>
    </div>
  );
}

export default Contact;
