import '../components/styles/Rent.css';
import { useCallback, useState, useEffect } from 'react';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';

function Rent() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [carsData, SetCarsData] = useState([]);
  const [serviceData, SetServiceData] = useState([]);

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
        .then((data) => {SetCarsData(data.cars)
          SetServiceData(data.services)});
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
        <div className="car-container">
          {filteredCarsData.map((car) => (
            <div key={car.model} className="car-card">
              <div className="photo-and-info-container">
                <div className="car-photo-container">
                  <img
                    className="car-photo"
                    alt={car.model}
                    src={`../../public/cars/${car.imageUrl}`}
                  />
                </div>
                <div className="title-and-info-container">
                  <h3 className="car-title">{car.model}</h3>
                  <div className="car-info-container">
                    <div className="car-info-elem">
                      <span className="material-symbols-outlined">person</span> {car.seats}
                    </div>
                    <div className="car-info-elem">
                      <span className="material-symbols-outlined">luggage</span> {car.trunkCapacity}
                    </div>
                    <div className="car-info-elem">
                      <span className="material-symbols-outlined">local_gas_station</span>{' '}
                      {car.fuel}
                    </div>
                    <div className="car-info-elem">
                      <span className="material-symbols-outlined">auto_transmission</span>{' '}
                      {car.transmission === 'A' ? 'Automatic' : 'Manual'}
                    </div>
                    <div className="car-info-elem">
                      <span className="material-symbols-outlined">settings</span>{' '}
                      {`${car.power} KW`}
                    </div>
                    <div className="car-info-elem">
                      <span className="material-symbols-outlined">payments</span>{' '}
                      {`${car.price} HUF`}
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" className="rent-button">
                Rent
              </button>
            </div>
          ))}
        </div>
      </BackGroundContext.Provider>
    </div>
  );
}

export default Rent;
