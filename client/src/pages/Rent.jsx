import { useCallback, useState } from 'react';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';

function Rent() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null)


  function getStartDate(data) {
    setStartDate(data);
  }

  function getEndDate(data) {
    setEndDate(data);
  }

  const handleGetStartDate = useCallback((data) => {
    getStartDate(data);
  }, [getStartDate]);
  
  const handleGetEndDate = useCallback((data) => {
    getEndDate(data);
  }, [getEndDate]);

  if(!startDate && !endDate) {
  return (
    <div>
      <BackGroundContext.Provider value="component-background rental-bg">
        <DatePicker getStartDate={handleGetStartDate} getEndDate={handleGetEndDate} />
      </BackGroundContext.Provider>
    </div>
  );
  }
    return (
      <div>
        <BackGroundContext.Provider value="opened">
          <DatePicker getStartDate={handleGetStartDate} getEndDate={handleGetEndDate} />
          <p>Rent</p>
        </BackGroundContext.Provider>
      </div>
    )
}

export default Rent;
