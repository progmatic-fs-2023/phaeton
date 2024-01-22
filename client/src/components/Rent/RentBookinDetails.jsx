import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CarContext from '../../contexts/CarContext';
import dateFormatter from '../../hooks/dateFormatter';
import numberWithSpaces from '../../hooks/numberWithSpaces';

function RentBookingDetails() {
  const { startDate, endDate, carId } = useParams();

  const navigate = useNavigate();

  const carCtx = useContext(CarContext);
  const { carData } = carCtx;

  function getDaysBetweenDates(fromDate, toDate) {
    // One day in milliseconds
    const oneDay = 24 * 60 * 60 * 1000;

    // Calculate the difference in milliseconds
    const diffMilliseconds = Math.abs(dateFormatter(toDate) - dateFormatter(fromDate));

    // Convert back to days and return
    return Math.round(diffMilliseconds / oneDay);
  }

  // formatting date to DD.MM.YYYY
  function formatDateString(inputDate) {
    const day = inputDate.substring(0, 2);
    const month = inputDate.substring(2, 4);
    const year = inputDate.substring(4, 8);

    return `${day}.${month}.${year}`;
  }

  const formattedStartDate = formatDateString(startDate);
  const formattedEndDate = formatDateString(endDate);

  function onBook(event) {
    event.preventDefault();
    navigate(`/rental/from/${startDate}/end/${endDate}/carId/${carId}/form`);
  }

  const splittedImageUrl = carData.imageUrl.split('.');
  return (
    <div className="end-booking-details-rent">
      <h2>Confirm your booking:</h2>
      <div>{`From ${formattedStartDate} to ${formattedEndDate}`}</div>
      <div className="car-container">
        <div key={carData.model} className="car-card">
          <div className="photo-and-info-container">
            <div className="car-photo-container">
              <LazyLoadImage
                effect="blur"
                src={`http://localhost:5173/cars/${carData.imageUrl}`}
                className="car-photo"
                alt={carData.model}
                placeholderSrc={`http://localhost:5173/cars/${splittedImageUrl[0]}_lazy.jpg`}
              />
            </div>
            <div className="title-and-info-container">
              <h3 className="car-title">{carData.model}</h3>
              <div className="car-info-container">
                <div className="car-info-elem">
                  <span className="material-symbols-outlined">person</span> {carData.seats}
                </div>
                <div className="car-info-elem">
                  <span className="material-symbols-outlined">luggage</span> {carData.trunkCapacity}
                </div>
                <div className="car-info-elem">
                  <span className="material-symbols-outlined">local_gas_station</span>{' '}
                  {carData.fuel}
                </div>
                <div className="car-info-elem">
                  <span className="material-symbols-outlined">auto_transmission</span>{' '}
                  {carData.transmission === 'A' ? 'Automatic' : 'Manual'}
                </div>
                <div className="car-info-elem">
                  <span className="material-symbols-outlined">settings</span>{' '}
                  {`${carData.power} KW`}
                </div>
              </div>
            </div>
            <p>
              Price: {numberWithSpaces(getDaysBetweenDates(startDate, endDate) * carData.price)} HUF
            </p>
          </div>
        </div>
      </div>

      <button type="submit" onClick={onBook}>
        Confirm
      </button>
    </div>
  );
}

export default RentBookingDetails;
