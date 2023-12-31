import '../components/styles/Rent.css';
import { useCallback, useState, useEffect, useRef } from 'react';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';
import Cars from '../components/Cars';

function Rent() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [carsData, setCarsData] = useState([]);
  const [originalCarsData, setOriginalCarsData] = useState([]);
  const [serviceData, setServiceData] = useState([]);

  const dieselRef = useRef(null)
  const petrolRef = useRef(null)
  const electricRef = useRef(null)

  useEffect(() => {
    if (startDate && endDate) {
      fetch('http://localhost:3000/rental/date', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ServiceStartDate: startDate,
          ServiceEndDate: endDate,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setOriginalCarsData(data.cars);
          setCarsData(data.cars);
          setServiceData(data.services);
        });
    }
  }, [startDate, endDate]);


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

  const filteredCarsData = carsData.filter(car => !serviceData.some(service => service.CarID === car.id));

  function filteringCars() {
    let dieselCars = [];
    let petrolCars = [];
    let electricCars = [];

    if (dieselRef.current.checked) {
      dieselCars = originalCarsData.filter((car) => car.fuel === 'Diesel');
    }
    if (petrolRef.current.checked) {
      petrolCars = originalCarsData.filter((car) => car.fuel === 'Petrol');
    }
    if (electricRef.current.checked) {
      electricCars = originalCarsData.filter((car) => car.fuel === 'Electric');
    }
  
    const combinedCars = [...dieselCars, ...petrolCars, ...electricCars];
    setCarsData(combinedCars.sort());
  }

  if (!startDate && !endDate) {
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
    <div className="rent-container">
      <BackGroundContext.Provider value="opened">
        <DatePicker getStartDate={handleGetStartDate} getEndDate={handleGetEndDate} />
        <div className='filter-main-container'>
          <div className='filter-container fuel-type'>
          <h3>Fuel-type</h3>
        <div className='filter-items'>
          <label htmlFor='diesel'>Diesel
          <input type='checkbox' ref={dieselRef} value='diesel' id='diesel' name='fuel-type' defaultChecked onClick={filteringCars}/>
          </label>
          <label htmlFor='diesel'>Petrol
          <input type='checkbox' ref={petrolRef} value='diesel' id='diesel' name='fuel-type' defaultChecked onClick={filteringCars}/>
          </label>
          <label htmlFor='diesel'>Electric
          <input type='checkbox' ref={electricRef} value='diesel' id='diesel' name='fuel-type' defaultChecked onClick={filteringCars}/>
          </label>
          </div>
        </div>
        </div>
        <Cars data={filteredCarsData} />
      </BackGroundContext.Provider>
    </div>
  );
}

export default Rent;
