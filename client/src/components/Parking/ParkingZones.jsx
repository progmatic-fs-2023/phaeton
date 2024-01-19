import React, { useState } from 'react';
import '../styles/Parking/ParkingZones.css';
import PropTypes from 'prop-types';
import NumberPicker from './NumberPicker';

function ParkingZones({ data, parkingID }) {
  // input value for multiple reservations, stored in useState
  const [numberOfSpots, setNumberOfSpots] = useState(1);

  const { parkings, services } = data;
  const zoneA = parkings.filter((parkingSpot) => parkingSpot.zone === 'A');
  const zoneB = parkings.filter((parkingSpot) => parkingSpot.zone === 'B');
  const zoneC = parkings.filter((parkingSpot) => parkingSpot.zone === 'C');
  const zoneD = parkings.filter((parkingSpot) => parkingSpot.zone === 'D');
  const zoneE = parkings.filter((parkingSpot) => parkingSpot.zone === 'E');
  const zoneF = parkings.filter((parkingSpot) => parkingSpot.zone === 'F');

  const zonesSpots = {
    zoneASpots: zoneA.length,
    zoneBSpots: zoneB.length,
    zoneCSpots: zoneC.length,
    zoneDSpots: zoneD.length,
    zoneESpots: zoneE.length,
    zoneFSpots: zoneF.length,
  };

  // checking the free spaces, record parking id checks the spot id, if matching -1 free space
  if (services.length > 0) {
    services.forEach((record) => {
      switch (true) {
        case zoneA.some((spot) => spot.id === record.ParkingLotID):
          zonesSpots.zoneASpots -= 1;
          break;
        case zoneB.some((spot) => spot.Id === record.ParkingLotID):
          zonesSpots.zoneBSpots -= 1;
          break;
        case zoneC.some((spot) => spot.id === record.ParkingLotID):
          zonesSpots.zoneCSpots -= 1;
          break;
        case zoneD.some((spot) => spot.id === record.ParkingLotID):
          zonesSpots.zoneDSpots -= 1;
          break;
        case zoneE.some((spot) => spot.id === record.ParkingLotID):
          zonesSpots.zoneESpots -= 1;
          break;
        case zoneF.some((spot) => spot.id === record.ParkingLotID):
          zonesSpots.zoneFSpots -= 1;
          break;
        default:
          break;
      }
    });
  }
  function checkSpace(zone) {
    if (zone === 0) {
      return 'noSpace';
    }
    if (zone > 0 && zone <= 10) {
      return 'fewSpots';
    }
    return 'freeSpace';
  }

  // finding a free parking spot, returns with the parking spot object
  function getParkingSpotID(zone, spotNum) {
    const zoneSpots = [...zone];
    const freeSpots = [];
    for (let i = 0; i < spotNum; i += 1) {
      const result = zoneSpots.find((spot) => {
        // checking the freeSpots array for duplicates
        if (freeSpots.length > 0) {
          return !freeSpots.some((record) => record.id === spot.id);
        }
        // checking if in services already present the spot.id
        if (services.length > 0) {
          return !services.some((record) => record.ParkingLotID === spot.id);
        }
        return true;
      });

      if (result) {
        freeSpots.push(result);
      }
    }
    parkingID(freeSpots);
  }

  const handleParkingSpotsNumberChange = (value) => {
    setNumberOfSpots(value);
  };

  return (
    <div>
      <NumberPicker value={numberOfSpots} onChange={handleParkingSpotsNumberChange} />
      <div className="zones-grid">
        <div className="office">
          <span>Office</span>
        </div>
        <div className="shuttle-div">
          <span>Shuttle</span>
        </div>

        <button
          type="button"
          className={`${checkSpace(zonesSpots.zoneASpots)} zone-btn zone-A`}
          onClick={() => getParkingSpotID(zoneA, numberOfSpots)}
        >
          Zone A
        </button>

        <button
          type="button"
          className={`${checkSpace(zonesSpots.zoneBSpots)} zone-btn zone-B`}
          onClick={() => getParkingSpotID(zoneB, numberOfSpots)}
        >
          Zone B
        </button>

        <button
          type="button"
          className={`${checkSpace(zonesSpots.zoneCSpots)} zone-btn zone-C`}
          onClick={() => getParkingSpotID(zoneC, numberOfSpots)}
        >
          Zone C
        </button>
        <button
          type="button"
          className={`${checkSpace(zonesSpots.zoneDSpots)} zone-btn zone-D`}
          onClick={() => getParkingSpotID(zoneD, numberOfSpots)}
        >
          Zone D
        </button>
        <button
          type="button"
          className={`${checkSpace(zonesSpots.zoneESpots)} zone-btn zone-E`}
          onClick={() => getParkingSpotID(zoneE, numberOfSpots)}
        >
          Zone E
        </button>
        <button
          type="button"
          className={`${checkSpace(zonesSpots.zoneFSpots)} zone-btn zone-F`}
          onClick={() => getParkingSpotID(zoneF, numberOfSpots)}
        >
          Zone F
        </button>
      </div>
    </div>
  );
}
ParkingZones.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  parkingID: PropTypes.func.isRequired,
};

export default ParkingZones;
