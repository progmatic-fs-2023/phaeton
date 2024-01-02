import React from 'react';
import Map from "./Map"

function ParkingBooking() {

  return (
    <div className="parking-zones-container">
<div className='parking-text-container'>

      <h1>Your vehicle is safe and secure with us.</h1>
      <h2>Select a parking zone </h2>
</div>
      <Map/>
    </div>
  );
}

export default ParkingBooking;
