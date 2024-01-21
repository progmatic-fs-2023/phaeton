import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import numberWithSpaces from '../../hooks/numberWithSpaces';

function Cars({ data, differenceInDays, onClickRent }) {
  Cars.propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
    differenceInDays: PropTypes.number.isRequired,
    onClickRent: PropTypes.func.isRequired,
  };


  if (data.length > 0) {
    return (
      <div className="car-container">
        {data.map((car) => {
          const splittedImageUrl = car.imageUrl.split('.');
          return (
            <div key={car.model} className="car-card">
              <div className="photo-and-info-container">
                <div className="car-photo-container">
                  <LazyLoadImage
                    effect="blur"
                    src={`http://localhost:5173/cars/${car.imageUrl}`}
                    className="car-photo"
                    alt={car.model}
                    placeholderSrc={`http://localhost:5173/cars/${splittedImageUrl[0]}_lazy.jpg`}
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
                      {`${car.price} HUF/day`}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="price-label">
                  <span className="price-label-title">{`Price for ${differenceInDays} days:`}</span>
                  <span className="price-label-price">{`${numberWithSpaces(
                    differenceInDays * car.price,
                  )} HUF`}</span>
                </div>
                <button type="button" className="rent-button" onClick={() => onClickRent(car)}>
                  Rent
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return <div className="no-car">{`There's no car to be shown`}</div>;
}

export default Cars;
