import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UserContext from '../../contexts/UserContext';
import dateFormatterWithHyphen from '../../utils/dateFromatterWhitHyphen';
import numberWithSpaces from '../../utils/numberWithSpaces';
import '../../components/styles/Pages/Services.css';

function CarServices() {
  const navigate = useNavigate();
  const [userServices, setUserServices] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);

  const userCtx = useContext(UserContext);
  if (userCtx.user === 'GuestUser') {
    useEffect(() => {
      navigate('/');
    }, []);
  }
  useEffect(() => {
    fetch('http://localhost:3000/users/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: userCtx.user.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUserServices(data);
      });
  }, [forceUpdate]);

  const handleCancel = (id) => {
    fetch(`http://localhost:3000/admin/cancel/${userCtx.user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setUserServices((prevServices) =>
          prevServices.map((service) =>
            service.id === id ? { ...service, isActive: false } : service,
          ),
        );
        setForceUpdate((prev) => !prev);
      });
  };
  function getDaysBetweenDates(fromDate, toDate) {
    const oneDay = 24 * 60 * 60 * 1000;

    // Átalakítjuk a dátumokat Date objektummá
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    const diffMilliseconds = Math.abs(endDate - startDate);
    const daysBetween = Math.round(diffMilliseconds / oneDay);

    return daysBetween;
  }
  const filteredServices = userServices.filter((service) => service.CarID);

  if (filteredServices.length === 0) {
    return (
      <div className="settings-center-h1">
        <h1>You should rent a car first.</h1>
      </div>
    );
  }
  return (
    <div>
      {userServices.map((services) => {
        if (services.Cars || services.CarID) {
          const splittedImageUrl = services.Cars.imageUrl.split('.');
          return (
            <div key={services.id}>
              <div className="car-container padding">
                <div className="car-date">{`From ${dateFormatterWithHyphen(
                  services.ServiceStartDate,
                )} to ${dateFormatterWithHyphen(services.ServiceEndDate)}`}</div>
                <div key={services.Cars.model} className="car-card">
                  <div className="photo-and-info-container">
                    <div className="car-photo-container">
                      <LazyLoadImage
                        effect="blur"
                        src={`http://localhost:5173/cars/${services.Cars.imageUrl}`}
                        className="car-photo"
                        alt={services.Cars.model}
                        placeholderSrc={`http://localhost:5173/cars/${splittedImageUrl[0]}_lazy.jpg`}
                      />
                    </div>
                    <div className="title-and-info-container">
                      <h3 className="car-title">{services.Cars.model}</h3>
                      <div className="car-info-container">
                        <div className="car-info-elem">
                          <span className="material-symbols-outlined">person</span>{' '}
                          {services.Cars.seats}
                        </div>
                        <div className="car-info-elem">
                          <span className="material-symbols-outlined">luggage</span>{' '}
                          {services.Cars.trunkCapacity}
                        </div>
                        <div className="car-info-elem">
                          <span className="material-symbols-outlined">local_gas_station</span>{' '}
                          {services.Cars.fuel}
                        </div>
                        <div className="car-info-elem">
                          <span className="material-symbols-outlined">auto_transmission</span>{' '}
                          {services.Cars.transmission === 'A' ? 'Automatic' : 'Manual'}
                        </div>
                        <div className="car-info-elem">
                          <span className="material-symbols-outlined">settings</span>{' '}
                          {`${services.Cars.power} KW`}
                        </div>
                        <div className="car-info-elem">
                          <span className="material-symbols-outlined">payments</span>{' '}
                          {`${services.Cars.price} HUF/day`}
                        </div>
                      </div>
                    </div>
                    <div className="price-cancel">
                      <p>
                        Price:{' '}
                        {numberWithSpaces(
                          getDaysBetweenDates(services.ServiceStartDate, services.ServiceEndDate) *
                            services.Cars.price,
                        )}{' '}
                        HUF
                      </p>
                      <div className="car-info-elem">
                        {services.IsActive ? (
                          <button
                            type="button"
                            className="cancel-btn"
                            disabled={!(new Date(services.ServiceStartDate) > new Date())}
                            onClick={() => handleCancel(services.id)}
                          >
                            Cancel
                          </button>
                        ) : (
                          <p className="canceled-p">Canceled</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default CarServices;
