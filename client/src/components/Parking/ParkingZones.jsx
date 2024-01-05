import React from 'react';
// import ParkingZone from './ParkingZone';
import '../styles/ParkingZones.css';

function ParkingZones(parkingLotData) {
  const zoneA = parkingLotData.data.parkings.filter((parkingSpot) => parkingSpot.zone === 'A');
  const zoneB = parkingLotData.data.parkings.filter((parkingSpot) => parkingSpot.zone === 'B');
  const zoneC = parkingLotData.data.parkings.filter((parkingSpot) => parkingSpot.zone === 'C');
  const zoneD = parkingLotData.data.parkings.filter((parkingSpot) => parkingSpot.zone === 'D');
  const zoneE = parkingLotData.data.parkings.filter((parkingSpot) => parkingSpot.zone === 'E');
  const zoneF = parkingLotData.data.parkings.filter((parkingSpot) => parkingSpot.zone === 'F');

  let zoneASpots = zoneA.length;
  let zoneBSpots = zoneB.length;
  let zoneCSpots = zoneC.length;
  let zoneDSpots = zoneD.length;
  let zoneESpots = zoneE.length;
  let zoneFSpots = zoneF.length;

  if (parkingLotData.data.services.length > 0) {
    parkingLotData.data.services.forEach((record) => {
      switch (true) {
        case zoneA.some((spot) => spot.id === record.ParkingLotID):
          zoneASpots--;
          break;
        case zoneB.some((spot) => spot.Id === record.ParkingLotID):
          zoneBSpots--;
          break;
        case zoneC.some((spot) => spot.id === record.ParkingLotID):
          zoneCSpots--;
          break;
        case zoneD.some((spot) => spot.id === record.ParkingLotID):
          zoneDSpots--;
          break;
        case zoneE.some((spot) => spot.id === record.ParkingLotID):
          zoneESpots--;
          break;
        case zoneF.some((spot) => spot.id === record.ParkingLotID):
          zoneFSpots--;
          break;
        default:
          break;
      }
    });
  }
  function checkSpace(zone) {
    if (zone.length === 0) {
      return 'noSpace';
    }
    if (zone.length > 0 && zone.length <= 10) {
      return 'fewSpots';
    }
    return 'freeSpace';
  }
  const zoneStatus = checkSpace(zoneA);

  // finding a free parking spot, returns with the parking spot ID
  function getParkingSpotID(zone) {
    const zoneSpots = [...zone];
    const result = zoneSpots.find((spot) => {
      if (parkingLotData.data.services.length > 0) {
        return !parkingLotData.data.services.some((record) => record.ParkingLotID === spot.id);
      }
      return true;
    });

    if (result) {
      return result.id;
    }
    return null;
  }

  return (
    <div className="zones-grid">
      <div className="office">
        <span>Office</span>
      </div>
      <div className="shuttle-div">
        <span>Shuttle</span>
      </div>

      <a href="/" className="zone-A">
        <div className={`${zoneStatus} zone-btn`} onClick={() => getParkingSpotID(zoneA)}>
          <span>Zone A</span>
        </div>
      </a>
      <a href="/" className="zone-B" onClick={() => getParkingSpotID(zoneA)}>
        <div className={`${zoneStatus} zone-btn`}>
          <span>Zone B</span>
        </div>
      </a>
      <a href="/" className="zone-C" onClick={() => getParkingSpotID(zoneA)}>
        <div className={`${zoneStatus} zone-btn`}>
          <span>Zone C</span>
        </div>
      </a>
      <a href="/" className="zone-D" onClick={() => getParkingSpotID(zoneA)}>
        <div className={`${zoneStatus} zone-btn`}>
          <span>Zone D</span>
        </div>
      </a>
      <a href="/" className="zone-E" onClick={() => getParkingSpotID(zoneA)}>
        <div className={`${zoneStatus} zone-btn`}>
          <span>Zone E</span>
        </div>
      </a>
      <a href="/" className="zone-F" onClick={() => getParkingSpotID(zoneA)}>
        <div className={`${zoneStatus} zone-btn`}>
          <span>Zone F</span>
        </div>
      </a>
    </div>
  );
}
export default ParkingZones;
