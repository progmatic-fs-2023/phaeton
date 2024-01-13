import { useCallback, useState, useEffect } from 'react';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';
import ParkingZones from '../components/Parking/ParkingZones';
import '../components/styles/Parking.css';

function Parking() {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [parkingLotData, setParkingLotData] = useState([]);
  
  function getStartDate(data) {
    setStartDate(data);
  }

  function getEndDate(data) {
    setEndDate(data);
  }

  const handleGetStartDate = useCallback(
    (data) => {
      getStartDate(data);
    },
    [getStartDate],
  );

  const handleGetEndDate = useCallback(
    (data) => {
      getEndDate(data);
    },
    [getEndDate],
  );

  // fetching data
  useEffect(() => {
    if (startDate && endDate) {
      setIsLoading(true);
      fetch('http://localhost:3000/parking/date', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ServiceStartDate: startDate,
          ServiceEndDate: endDate,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setParkingLotData(data);
          setIsLoading(false);
        })
        .catch((error) => <div>{`There has been a problem with your fetch operation: ${error}`}</div>);
    }
  }, [startDate, endDate]);
  
  if (!startDate && !endDate) {
    return (
      <div>
        <h1 className='page-title mobile'>Parking</h1>
        <h1 className='page-title desktop'>Parking - Secure your Car While You&apos;re Away</h1>
        <BackGroundContext.Provider value="component-background parking-bg">
          <DatePicker getStartDate={handleGetStartDate} getEndDate={handleGetEndDate} />
        </BackGroundContext.Provider>
      </div>
    );
  }
  return (
    <div>
      <BackGroundContext.Provider value="opened">
        <DatePicker getStartDate={handleGetStartDate} getEndDate={handleGetEndDate} />
      </BackGroundContext.Provider>
      {isLoading || !parkingLotData || parkingLotData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="parking-zones-container">
          <div className="parking-text-container">
            <h1>Your vehicle is safe and secure with us.</h1>
            <h2>Select a parking zone </h2>
          </div>
          <ParkingZones data={parkingLotData} />
        </div>
      )}
    </div>
  );
}

export default Parking;
