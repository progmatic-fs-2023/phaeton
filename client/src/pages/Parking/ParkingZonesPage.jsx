import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import LoadingScreen from '../../components/ReusableComponents/LoadingScreen';
import ParkingBooking from '../../components/Parking/ParkingBooking';
import DatePicker from '../../components/ReusableComponents/DatePicker';
import BackGroundContext from '../../contexts/BackgroundContext';
import formatDate from '../../hooks/formatDate';

function ParkingZonesPage() {
  const { startDate, endDate } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [parkingLotData, setParkingLotData] = useState([]);
  const navigate = useNavigate();
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

  const onSearchFn = (startDate, endDate) =>
    startDate &&
    endDate &&
    navigate(`/parking/from/${formatDate(startDate)}/end/${formatDate(endDate)}`);
  return (
    <div>
      <h1>ParkingZOnes</h1>

      <BackGroundContext.Provider value="opened" />
      {isLoading || !parkingLotData || parkingLotData.length === 0 ? (
        <LoadingScreen />
      ) : (
        <>
          <DatePicker
            onSearch={(startDateOnSearch, endDateOnSearch) => {
              onSearchFn(startDateOnSearch, endDateOnSearch);
            }}
          />
          <ParkingBooking data={parkingLotData} />
        </>
      )}
    </div>
  );
}

export default ParkingZonesPage;
