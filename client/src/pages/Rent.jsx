import '../components/styles/Rent.css';
import { useCallback, useState, useEffect, useRef } from 'react';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';
import Cars from '../components/Cars';
import CarFilter from '../components/CarFilter';
import useDocumentTitle from '../components/useDocumentTitle';
import LoadingScreen from '../components/LoadingScreen';
import SortBy from '../components/SortBy';
import CarFilterMobile from '../components/CarFilterMobile';

function Rent() {
  useDocumentTitle('Phaeton · Rent');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [originalCarsData, setOriginalCarsData] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dieselRef = useRef(null);
  const petrolRef = useRef(null);
  const electricRef = useRef(null);
  const seatsAbove4Ref = useRef(null);
  const seatsAbove6Ref = useRef(null);
  const luggageAbove4Ref = useRef(null);
  const luggageAbove6Ref = useRef(null);
  const manualRef = useRef(null);
  const automaticRef = useRef(null);
  const powerAbove75KwRef = useRef(null);
  const powerAbove100KwRef = useRef(null);
  const powerAbove125KwRef = useRef(null);
  const powerAbove150KwRef = useRef(null);
  const pricefrom0to12000Ref = useRef(null);
  const pricefrom12000to15000Ref = useRef(null);
  const pricefrom15000Ref = useRef(null);

  useEffect(() => {
    if (startDate && endDate) {
      setIsLoading(true);
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
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          const sortedCars = [...data.cars].sort((a, b) => a.model.localeCompare(b.model));
          setOriginalCarsData(sortedCars);
          setCarsData(sortedCars);
          setServiceData(data.services);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          return <div>{`There has been a problem with your fetch operation: ${error}`}</div>;
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

  function filteringCars(event) {
    event.stopPropagation();
    let filteredCars = [...originalCarsData];

    if (dieselRef.current.checked || petrolRef.current.checked || electricRef.current.checked) {
      filteredCars = filteredCars.filter(
        (car) =>
          (dieselRef.current.checked && car.fuel === 'Diesel') ||
          (petrolRef.current.checked && car.fuel === 'Petrol') ||
          (electricRef.current.checked && car.fuel === 'Electric'),
      );
    }

    if (seatsAbove4Ref.current.checked || seatsAbove6Ref.current.checked) {
      filteredCars = filteredCars.filter(
        (car) =>
          (seatsAbove4Ref.current.checked && car.seats >= 4) ||
          (seatsAbove6Ref.current.checked && car.seats >= 6),
      );
    }

    if (luggageAbove4Ref.current.checked || luggageAbove6Ref.current.checked) {
      filteredCars = filteredCars.filter(
        (car) =>
          (luggageAbove4Ref.current.checked && car.trunkCapacity >= 4) ||
          (luggageAbove6Ref.current.checked && car.trunkCapacity >= 6),
      );
    }

    if (manualRef.current.checked || automaticRef.current.checked) {
      filteredCars = filteredCars.filter(
        (car) =>
          (manualRef.current.checked && car.transmission === 'M') ||
          (automaticRef.current.checked && car.transmission === 'A'),
      );
    }

    if (
      powerAbove75KwRef.current.checked ||
      powerAbove100KwRef.current.checked ||
      powerAbove125KwRef.current.checked ||
      powerAbove150KwRef.current.checked
    ) {
      filteredCars = filteredCars.filter(
        (car) =>
          (powerAbove75KwRef.current.checked && car.power >= 75) ||
          (powerAbove100KwRef.current.checked && car.power >= 100) ||
          (powerAbove125KwRef.current.checked && car.power >= 125) ||
          (powerAbove150KwRef.current.checked && car.power >= 150),
      );
    }

    if (
      pricefrom0to12000Ref.current.checked ||
      pricefrom12000to15000Ref.current.checked ||
      pricefrom15000Ref.current.checked
    ) {
      filteredCars = filteredCars.filter(
        (car) =>
          (pricefrom0to12000Ref.current.checked && car.price <= 12000) ||
          (pricefrom12000to15000Ref.current.checked && car.price >= 12000 && car.price <= 15000) ||
          (pricefrom15000Ref.current.checked && car.price >= 15000),
      );
    }

    setCarsData(filteredCars);
  }

  const handleFilteringCars = useCallback(
    (event) => {
      filteringCars(event);
    },
    [filteringCars],
  );

  function sortingFunction(sortByTarget) {
    const sortedCars = [...carsData];

    if (sortByTarget === 'cheapest') {
      sortedCars.sort((a, b) => a.price - b.price);
    } else if (sortByTarget === 'most-expensive') {
      sortedCars.sort((a, b) => b.price - a.price);
    } else if (sortByTarget === 'name-a-z') {
      sortedCars.sort((a, b) => a.model.localeCompare(b.model));
    } else if (sortByTarget === 'name-z-a') {
      sortedCars.sort((a, b) => b.model.localeCompare(a.model));
    } else if (sortByTarget === 'least-seats') {
      sortedCars.sort((a, b) => a.seats - b.seats);
    } else if (sortByTarget === 'most-seats') {
      sortedCars.sort((a, b) => b.seats - a.seats);
    } else if (sortByTarget === 'least-luggage') {
      sortedCars.sort((a, b) => a.trunkCapacity - b.trunkCapacity);
    } else if (sortByTarget === 'most-luggage') {
      sortedCars.sort((a, b) => b.trunkCapacity - a.trunkCapacity);
    } else if (sortByTarget === 'least-power') {
      sortedCars.sort((a, b) => a.power - b.power);
    } else if (sortByTarget === 'most-power') {
      sortedCars.sort((a, b) => b.power - a.power);
    }
    setCarsData(sortedCars);
  }

  const handleSortingFunction = useCallback(
    (event) => {
      sortingFunction(event);
    },
    [sortingFunction],
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  const differenceInTime = endDate.getTime() - startDate.getTime();
  let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  if (differenceInDays < 1) {
    differenceInDays = 1;
  }

  // Page with the date values
  return (
    <div className="rent-container">
      <BackGroundContext.Provider value="opened">
        <DatePicker getStartDate={handleGetStartDate} getEndDate={handleGetEndDate} />
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <div>
            <div className="car-service-container">
              {windowWidth >= 1270 && (
                <div className="car-filter">
                  <CarFilter
                    dieselRef={dieselRef}
                    petrolRef={petrolRef}
                    electricRef={electricRef}
                    seatsAbove4Ref={seatsAbove4Ref}
                    seatsAbove6Ref={seatsAbove6Ref}
                    luggageAbove4Ref={luggageAbove4Ref}
                    luggageAbove6Ref={luggageAbove6Ref}
                    manualRef={manualRef}
                    automaticRef={automaticRef}
                    powerAbove75KwRef={powerAbove75KwRef}
                    powerAbove100KwRef={powerAbove100KwRef}
                    powerAbove125KwRef={powerAbove125KwRef}
                    powerAbove150KwRef={powerAbove150KwRef}
                    pricefrom0to12000Ref={pricefrom0to12000Ref}
                    pricefrom12000to15000Ref={pricefrom12000to15000Ref}
                    pricefrom15000Ref={pricefrom15000Ref}
                    filteringCars={handleFilteringCars}
                  />
                </div>
              )}
              <div className="sortby-and-car-container">
                <div className="sortby-and-mobile-filter-container">
                  {windowWidth < 1270 && (
                    <div className="car-filter-mobile">
                      <CarFilterMobile
                        dieselRef={dieselRef}
                        petrolRef={petrolRef}
                        electricRef={electricRef}
                        seatsAbove4Ref={seatsAbove4Ref}
                        seatsAbove6Ref={seatsAbove6Ref}
                        luggageAbove4Ref={luggageAbove4Ref}
                        luggageAbove6Ref={luggageAbove6Ref}
                        manualRef={manualRef}
                        automaticRef={automaticRef}
                        powerAbove75KwRef={powerAbove75KwRef}
                        powerAbove100KwRef={powerAbove100KwRef}
                        powerAbove125KwRef={powerAbove125KwRef}
                        powerAbove150KwRef={powerAbove150KwRef}
                        pricefrom0to12000Ref={pricefrom0to12000Ref}
                        pricefrom12000to15000Ref={pricefrom12000to15000Ref}
                        pricefrom15000Ref={pricefrom15000Ref}
                        filteringCars={handleFilteringCars}
                      />
                    </div>
                  )}
                  <SortBy className="sort-by-cars" handleSortingFunction={handleSortingFunction} />
                </div>
                <Cars data={filteredCarsData} differenceInDays={differenceInDays} />
              </div>
            </div>
          </div>
        )}
      </BackGroundContext.Provider>
    </div>
  );
}

export default Rent;
