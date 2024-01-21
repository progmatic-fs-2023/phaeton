import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Booking/ServiceMessage.css'

function ServiceMessage({ message }) {
  return (
    <div className='service-message-container'>
      <h2>{message}</h2>
      <p>Redirecting to the Homepage...</p>
    </div>
  );
}

ServiceMessage.propTypes = {
  message: PropTypes.func.isRequired,
};
export default ServiceMessage;
