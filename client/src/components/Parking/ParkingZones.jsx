import React from 'react';
import '../styles/ParkingZones.css';

function ParkingZones(ParkingData) {
  const { data } = ParkingData;
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
    if (zone.length === 0) {
      return 'noSpace';
    }
    if (zone.length > 0 && zone.length <= 10) {
      return 'fewSpots';
    }
    return 'freeSpace';
  }

  // const zoneStatus = checkSpace(zoneASpots);

  // finding a free parking spot, returns with the parking spot ID
  function getParkingSpotID(zone) {
    const zoneSpots = [...zone];
    const result = zoneSpots.find((spot) => {
      if (services.length > 0) {
        return !services.some((record) => record.ParkingLotID === spot.id);
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

      <button
        type="button"
        className={`${checkSpace(zonesSpots.zoneASpots)} zone-btn zone-A`}
        onClick={() => getParkingSpotID(zoneA)}
      >
        Zone A
      </button>

      <button
        type="button"
        className={`${checkSpace(zonesSpots.zoneBSpots)} zone-btn zone-B`}
        onClick={() => getParkingSpotID(zoneA)}
      >
        Zone B
      </button>

      <button
        type="button"
        className={`${checkSpace(zonesSpots.zoneCSpots)} zone-btn zone-C`}
        onClick={() => getParkingSpotID(zoneA)}
      >
        Zone C
      </button>
      <button
        type="button"
        className={`${checkSpace(zonesSpots.zoneDSpots)} zone-btn zone-D`}
        onClick={() => getParkingSpotID(zoneA)}
      >
        Zone D
      </button>
      <button
        type="button"
        className={`${checkSpace(zonesSpots.zoneESpots)} zone-btn zone-E`}
        onClick={() => getParkingSpotID(zoneA)}
      >
        Zone E
      </button>
      <button
        type="button"
        className={`${checkSpace(zonesSpots.zoneFSpots)} zone-btn zone-F`}
        onClick={() => getParkingSpotID(zoneA)}
      >
        Zone F
      </button>
    </div>
  );
}
export default ParkingZones;
