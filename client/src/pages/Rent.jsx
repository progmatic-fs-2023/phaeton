import { useCallback, useState, useEffect } from 'react';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';

function Rent() {
  
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null)
  const [carsData, SetCarsData] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/rental')
    .then(response => response.json())
    .then(data => SetCarsData(data));
  }, []);

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
    // Component with the background
    <div>
      <BackGroundContext.Provider value="component-background rental-bg">
        <DatePicker getStartDate={handleGetStartDate} getEndDate={handleGetEndDate} />
      </BackGroundContext.Provider>
    </div>
  );
  }
  // Page with the date values
    return (
<div>
      <BackGroundContext.Provider value="opened">
        <DatePicker getStartDate={handleGetStartDate} getEndDate={handleGetEndDate} />
        {carsData.map((item) => 
          (<div key={item.model} className='car-card'>
            <img className='car-photo' alt={item.model} src={`../../public/cars/${item.imageUrl}`} />
            <p>{item.model}</p>
            </div>)
        )}
      </BackGroundContext.Provider>
    </div>
  );
}

export default Rent;
