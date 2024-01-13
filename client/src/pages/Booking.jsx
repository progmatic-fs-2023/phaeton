import React from 'react';
import PropTypes from 'prop-types';
import ParkingBookingDetails from '../components/Booking/ParkingBookingDetails';

function Booking({ service }) {
  Booking.propTypes = {
    service: PropTypes.string.isRequired,
  };
  if (service === 'parking') {
    return <ParkingBookingDetails />;
  }
  if (service === 'rental') {
    // rental optimalization
    // return <BookingDetails details="rentalDetails" />;
  }

  return <h1>Hello kusztomer</h1>;
}

export default Booking;
