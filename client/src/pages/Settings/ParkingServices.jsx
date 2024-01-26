import { React, useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router';
import dateFormatterWithHyphen from '../../utils/dateFromatterWhitHyphen';
import numberWithSpaces from '../../utils/numberWithSpaces';
import '../../components/styles/Pages/Services.css';

export default function ParkingServices() {
  const navigate = useNavigate();
  const [userServices, setUserServices] = useState([]);

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
  }, []);

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
      }, [userCtx.user]);
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

  return (
    <div>
      {userServices.map((services) => {
        if (services.Cars === null || services.carID === null) {
          return (
            <div className="car-container" key={services.id}>
              <div className="car-card">
                {' '}
                <div>
                  {`From ${dateFormatterWithHyphen(
                    services.ServiceStartDate,
                  )} to ${dateFormatterWithHyphen(services.ServiceEndDate)}`}
                </div>
                <div>{`Your Parking Zone Is : ${services.ParkingLot.zone}`}</div>
                <div>
                  {console.log(services.ServiceStartDate)}
                  <p>
                    Price:{' '}
                    {numberWithSpaces(
                      getDaysBetweenDates(services.ServiceStartDate, services.ServiceEndDate) *
                        3000,
                    )}{' '}
                    HUF
                  </p>
                </div>
                <div>
                  {services.IsActive ? (
                    <button
                      disabled={new Date(services.ServiceStartDate) > new Date() ? false : true}
                      onClick={() => handleCancel(services.id)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <p>Canceled</p>
                  )}
                </div>
              </div>
              <div></div>
            </div>
          );
        } else if (!services.ParkingLot) {
          return (
            <div className="settings-center-h1">
              <h1>You should book a parkingLot first.</h1>
            </div>
          );
        }
      })}
    </div>
  );
}
