import React from 'react';
import PropTypes from 'prop-types';

function Cars({ data }) {
  Cars.propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
  };
  if (data.length > 0) {
    return (
      <div className="car-container">
        {data.map((car) => (
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
                    <span className="material-symbols-outlined">local_gas_station</span> {car.fuel}
                  </div>
                  <div className="car-info-elem">
                    <span className="material-symbols-outlined">auto_transmission</span>{' '}
                    {car.transmission === 'A' ? 'Automatic' : 'Manual'}
                  </div>
                  <div className="car-info-elem">
                    <span className="material-symbols-outlined">settings</span> {`${car.power} KW`}
                  </div>
                  <div className="car-info-elem">
                    <span className="material-symbols-outlined">payments</span>{' '}
                    {`${car.price} / day`}
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
    );
  }
  return "Unfortunately there's no cars for these requirements :(";
}

export default Cars;
