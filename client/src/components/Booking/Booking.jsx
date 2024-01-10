import React from 'react';
import BookingDetails from './BookingDetails';

function Booking(service) {
  function formatDate(date) {
    const result = date.toLocaleDateString('default', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return result;
  }

  if (service.parking) {
    const { parkingSpotID, bookDate } = service.parking;
    const { startDate, endDate } = bookDate;

    // the object with details data
    const parkingDetails = {
      parkingSpotID,
      fromDate: formatDate(startDate),
      toDate: formatDate(endDate),
    };
    return <BookingDetails details={parkingDetails} />;
  }
  if (service.rental) {
    // rental optimalization
    return <BookingDetails details="rentalDetails" />;
  }

  return null; // Kezelés, ha nincs sem parking, sem rental adat
}

export default Booking;
