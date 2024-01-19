import React from 'react';
import PropTypes from 'prop-types';
import ParkingBookingDetails from '../components/Booking/ParkingBookingDetails';
import RentBookingDetails from '../components/Rent/RentBookinDetails';

function Booking({ service }) {
  Booking.propTypes = {
    service: PropTypes.string.isRequired,
  };
  if (service === 'parking') {
    return <ParkingBookingDetails />;
  }
  if (service === 'rental') {
    return <RentBookingDetails />
  }
}

export default Booking;
