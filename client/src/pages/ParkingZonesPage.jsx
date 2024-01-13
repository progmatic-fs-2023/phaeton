import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import LoadingScreen from '../components/LoadingScreen';
import ParkingBooking from '../components/Parking/ParkingBooking';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';

function ParkingZonesPage() {
  const { startDate, endDate } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  // const [startDate, setStartDate] = useState(null);
  const [parkingLotData, setParkingLotData] = useState([]);

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
        .catch((error) => (
          <div>{`There has been a problem with your fetch operation: ${error}`}</div>
        ));
    }
  }, [startDate, endDate]);
  return (
    <div>
      <h1>ParkingZOnes</h1>

      <BackGroundContext.Provider value="opened">
        <DatePicker />
      </BackGroundContext.Provider>
      {isLoading || !parkingLotData || parkingLotData.length === 0 ? (
        <LoadingScreen />
      ) : (
        <ParkingBooking data={parkingLotData} />
      )}
    </div>
  );
}

export default ParkingZonesPage;
