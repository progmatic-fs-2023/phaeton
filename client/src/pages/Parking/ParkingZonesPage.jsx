import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import LoadingScreen from '../../components/ReusableComponents/LoadingScreen';
import ParkingBooking from '../../components/Parking/ParkingBooking';
import DatePicker from '../../components/ReusableComponents/DatePicker';
import BackGroundContext from '../../contexts/BackgroundContext';
import formatDate from '../../utils/formatDate';

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

  const onSearchFn = (startDateOnSearch, endDateOnSearch) =>
    startDateOnSearch &&
    endDateOnSearch &&
    navigate(`/parking/from/${formatDate(startDateOnSearch)}/end/${formatDate(endDateOnSearch)}`);
  return (
    <div>
      <BackGroundContext.Provider value="opened">
        {isLoading || !parkingLotData || parkingLotData.length === 0 ? (
          <LoadingScreen />
        ) : (
          <div className="parking-booking-bg">
            <DatePicker
              onSearch={(startDateOnSearch, endDateOnSearch) => {
                onSearchFn(startDateOnSearch, endDateOnSearch);
              }}
            />
            <ParkingBooking data={parkingLotData} />
          </div>
        )}
      </BackGroundContext.Provider>
    </div>
  );
}

export default ParkingZonesPage;
