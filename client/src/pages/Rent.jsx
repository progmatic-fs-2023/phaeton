import '../components/styles/Rent.css';
import { useCallback, useState, useEffect, useRef } from 'react';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';
import Cars from '../components/Cars';
import CarFilter from '../components/CarFilter';
import useDocumentTitle from '../components/useDocumentTitle';

function Rent() {
  useDocumentTitle('Phaeton · Rent');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [carsData, setCarsData] = useState([]);
  const [originalCarsData, setOriginalCarsData] = useState([]);
  const [serviceData, setServiceData] = useState([]);

  const dieselRef = useRef(null);
  const petrolRef = useRef(null);
  const electricRef = useRef(null);

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
          const sortedCars = [...data.cars].sort((a, b) => a.model.localeCompare(b.model));
          setOriginalCarsData(sortedCars);
          setCarsData(sortedCars);
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

  const filteredCarsData = carsData.filter(
    (car) => !serviceData.some((service) => service.CarID === car.id),
  );

  function filteringCars(data) {
    let filteredCars = [...originalCarsData];

    if (dieselRef.current.checked || petrolRef.current.checked || electricRef.current.checked) {
      filteredCars = filteredCars.filter(
        (car) =>
          (dieselRef.current.checked && car.fuel === 'Diesel') ||
          (petrolRef.current.checked && car.fuel === 'Petrol') ||
          (electricRef.current.checked && car.fuel === 'Electric'),
      );
    }

    if (data[2] === 'seats') {
      filteredCars = filteredCars.filter((car) => data[0] <= car.seats && car.seats <= data[1]);
    }
    if (data[2] === 'price') {
      filteredCars = filteredCars.filter((car) => data[0] <= car.price && car.price <= data[1]);
    }
    if (data[2] === 'trunk') {
      filteredCars = filteredCars.filter(
        (car) => data[0] <= car.trunkCapacity && car.trunkCapacity <= data[1],
      );
    }
    if (data[2] === 'power') {
      filteredCars = filteredCars.filter((car) => data[0] <= car.power && car.power <= data[1]);
    }

    setCarsData(filteredCars);
  }

  const handleFilteringCars = useCallback(
    (data) => {
      filteringCars(data);
    },
    [filteringCars],
  );

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
        <div className="car-service-container">
          <CarFilter
            dieselRef={dieselRef}
            petrolRef={petrolRef}
            electricRef={electricRef}
            filteringCars={handleFilteringCars}
          />
          <Cars data={filteredCarsData} />
        </div>
      </BackGroundContext.Provider>
    </div>
  );
}

export default Rent;
