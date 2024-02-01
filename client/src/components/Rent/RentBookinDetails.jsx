import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CarContext from '../../contexts/CarContext';
import getDaysBetweenDates from '../../utils/getDaysBetweenDates';
import numberWithSpaces from '../../utils/numberWithSpaces';
import dateFormatWithDots from '../../utils/dateFormatWithDots';
import '../styles/Rent/RentBookingDetails.css';
import BackButton from '../ReusableComponents/BackButton';

function RentBookingDetails() {
  const { startDate, endDate, carId } = useParams();
  const [isOnThisSite, setIsOnThisSite] = useState(true);

  const navigate = useNavigate();

  const carCtx = useContext(CarContext);
  const { carData } = carCtx;

  useEffect(() => {
    if (!carData) {
      navigate('/rental');
    }
  }, [carData]);
  // formatting date to DD.MM.YYYY
  const formattedStartDate = dateFormatWithDots(startDate);
  const formattedEndDate = dateFormatWithDots(endDate);

  // const price = numberWithSpaces(getDaysBetweenDates(startDate, endDate) * carData.price);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const e = event;
      const message = 'You have unsaved changes. If you leave the page, your changes will be lost.';
      e.returnValue = message; // Standard for most browsers
      setIsOnThisSite(false);
      return message; // For some older browsers
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      // removing eventListener
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isOnThisSite]);

  function onBook(event) {
    event.preventDefault();
    navigate(`/rental/from/${startDate}/end/${endDate}/carId/${carId}/form`);
  }

  if (carData) {
    const splittedImageUrl = carData.imageUrl.split('.');
    return (
      <div>
        <BackButton />
        <div className="end-booking-details-rent">
          <div className="car-container-for-confirm">
            <div>
              <h2>Your Deal</h2>
              <div className="from-to-div-for-confirm">{`From ${formattedStartDate} to ${formattedEndDate}`}</div>
            </div>
            <h3 className="car-title">{carData.model}</h3>
            <div key={carData.model} className="car-card-for-confirm">
              <div className="photo-and-info-container-for-confirm">
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
                  <div className="car-info-container">
                    <div className="car-info-elem">
                      <span className="material-symbols-outlined">person</span> {carData.seats}
                    </div>
                    <div className="car-info-elem">
                      <span className="material-symbols-outlined">luggage</span>{' '}
                      {carData.trunkCapacity}
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
              </div>
            </div>
            <div className="price-container-for-confirm">
              <p>Price for {getDaysBetweenDates(startDate, endDate)} days: </p>{' '}
              <p className="price-for-confirm">
                {carData
                  ? numberWithSpaces(getDaysBetweenDates(startDate, endDate) * carData.price)
                  : null}{' '}
                HUF
              </p>
            </div>
          </div>

          <button className="rent-button" type="submit" onClick={onBook}>
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

export default RentBookingDetails;
