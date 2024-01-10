import React, { useState } from 'react';
import ParkingZones from './ParkingZones';
import Booking from '../Booking/Booking';

function ParkingBooking(parkingLotData) {
  const [isBooking, setIsBooking] = useState(false);
  const [parkingLotSpot, setParkingSpot] = useState({});
  const { data: parkingData, bookDate } = parkingLotData;

  function getParkingID(id) {
    setParkingSpot(id);
    setIsBooking(true);
  }
  const ParkingService = {
    parkingSpotID: parkingLotSpot,
    bookDate,
  };
  if (isBooking) {
    // return <Booking bookedSpot={parkingLotSpot} userBookDate={bookDate} />;
    return <Booking parking={ParkingService} />;
  } 
    return (
      <div className="parking-zones-container">
        <div className="parking-text-container">
          <h1>Your vehicle is safe and secure with us.</h1>
          <h2>Select a parking zone </h2>
        </div>
        <ParkingZones data={parkingData} parkingID={getParkingID} />
      </div>
    );
  
}

export default ParkingBooking;
