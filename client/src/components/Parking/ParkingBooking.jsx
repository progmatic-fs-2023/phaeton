import React, { useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ParkingZones from './ParkingZones';
import '../styles/Booking/ParkingBooking.css';
import ParkingDetailsContext from '../../contexts/ParkingDetailsContext';

function ParkingBooking(parkingLotData) {
  const navigate = useNavigate();
  const parkingCtx = useContext(ParkingDetailsContext);
  const { startDate, endDate } = useParams();
  const { data: parkingData } = parkingLotData;

  function getParkingID(parking) {
    parkingCtx.setParkingData(parking);
    navigate(
      `/parking/from/${startDate}/end/${endDate}/zone/${parking[0].zone}/spots/${parking.length}`,
      { state: parking },
    );
  }
  const handleGetParkingID = useCallback(
    (parking) => {
      if (parking.length > 0) {
        getParkingID(parking);
      }
    },
    [getParkingID],
  );
  return (
    <div className="parking-zones-container">
      <div className="parking-text-container">
        <h1>Your vehicle is safe and secure with us.</h1>
        <p className="price-tag">Each parking spots cost 3000 HUF per day</p>
      </div>
      <ParkingZones data={parkingData} parkingID={handleGetParkingID} />
    </div>
  );
}

export default ParkingBooking;
