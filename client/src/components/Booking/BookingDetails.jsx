import React from 'react';
import ParkingBookingDetails from './ParkingBookingDetails';

function BookingDetails({ details }) {
  // console.log(details);
  if (details.parkingSpotID) {
    return (
      <div className="booking-details">
        <ParkingBookingDetails props={details} />
      </div>
    );
  }
  // else if (details.rental) {
  //   return (
  //     <div className="booking-details">
  //       <ParkingBookingDetails props={details} />
  //     </div>
  //   );
  // }
}
export default BookingDetails;
