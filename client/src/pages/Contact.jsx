import React from 'react';

function Contact() {
  return (
    <div>
      <h3>Contact us</h3>
      <form action="#">
        <label>
          E-mail : <br />
          <input name="email" type="email" />
        </label>
        <br />
        <label>
          Name : <br />
          <input type="text" />
        </label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </form>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21588.920383255554!2d19.209896972484184!3d47.438949132283994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741c1853f7670cb%3A0x8dc29c061f7cddb3!2sBudapest%2C%20Ferihegy!5e0!3m2!1shu!2shu!4v1702581603529!5m2!1shu!2shu"
        width="300"
        height="300"
      ></iframe>
    </div>
  );
}

export default Contact;
