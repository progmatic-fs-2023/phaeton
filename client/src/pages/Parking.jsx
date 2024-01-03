import { useCallback, useState } from 'react';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';
import useDocumentTitle from '../components/useDocumentTitle';

function Parking() {
  useDocumentTitle('Phaeton · Parking');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  if (!startDate && !endDate) {
    return (
      <div>
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
        <p>Parking</p>
      </BackGroundContext.Provider>
    </div>
  );
}

export default Parking;
