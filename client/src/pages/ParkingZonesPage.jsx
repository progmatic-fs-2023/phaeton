import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import LoadingScreen from '../components/LoadingScreen';
import ParkingBooking from '../components/Parking/ParkingBooking';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';

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

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}${month}${year}`;
  }
  const onSearchFn = (startDateOnSearch, endDateOnSearch) => {
    if (startDateOnSearch && endDateOnSearch) {
      const formattedStartDate = formatDate(startDateOnSearch);
      const formattedEndDate = formatDate(endDateOnSearch);
      navigate(`/parking/from/${formattedStartDate}/end/${formattedEndDate}`);
    }
  };
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
