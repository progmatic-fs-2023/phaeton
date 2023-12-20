import { useCallback } from 'react';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';

function Parking() {
  let startDate;
  let endDate;

  function getStartDate(data) {
    startDate = data;
    return startDate;
  }

  function getEndDate(data) {
    endDate = data;
    return endDate;
  }

  const handleGetStartDate = useCallback(() => {
    getStartDate();
  }, [getStartDate]);

  const handleGetEndDate = useCallback(() => {
    getEndDate();
  }, [getEndDate]);

  return (
    <div>
      <BackGroundContext.Provider value="parking-bg">
        <DatePicker getStartDate={handleGetStartDate} getEndDate={handleGetEndDate} />
      </BackGroundContext.Provider>
    </div>
  );
}

export default Parking;
