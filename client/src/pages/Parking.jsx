import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';
import '../components/styles/Parking.css';

function Parking() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

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
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}${month}${year}`;
  }

  const dateParametersOnSearch = (date1, date2) => {
    const formattedStartDate = formatDate(date1);
    const formattedEndDate = formatDate(date2);
    navigate(`/parking/from/${formattedStartDate}/end/${formattedEndDate}`);
  };
  if (!startDate && !endDate) {
    return (
      <div>
        <BackGroundContext.Provider value="component-background parking-bg">
          <h1>Parking Page</h1>
          <DatePicker getStartDate={handleGetStartDate} getEndDate={handleGetEndDate} />
        </BackGroundContext.Provider>
      </div>
    );
  }
  return <div>{dateParametersOnSearch(startDate, endDate)}</div>;
}

export default Parking;
