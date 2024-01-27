import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import UserContext from '../../contexts/UserContext';
import dateFormatterWithHyphen from '../../utils/dateFromatterWhitHyphen';
import numberWithSpaces from '../../utils/numberWithSpaces';
import '../../components/styles/Pages/Services.css';

export default function ParkingServices() {
  const navigate = useNavigate();
  const [userServices, setUserServices] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const filteredServices = userServices.filter((service) => service.ParkingLotID);

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

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    const diffMilliseconds = Math.abs(endDate - startDate);
    const daysBetween = Math.round(diffMilliseconds / oneDay);
    return daysBetween;
  }

  if (filteredServices.length === 0) {
    return (
      <div className="settings-center-h1">
        <h1>You should book a parkingLot first.</h1>
      </div>
    );
  }

  return (
    <div>
      {userServices.map((services) => {
        if (services.ParkingLot || services.ParkingLotID) {
          return (
            <div className="car-container padding" key={services.id}>
              <div className="car-card">
                {' '}
                <div>
                  {`From ${dateFormatterWithHyphen(
                    services.ServiceStartDate,
                  )} to ${dateFormatterWithHyphen(services.ServiceEndDate)}`}
                </div>
                <div>{`Your Parking Zone Is : ${services.ParkingLot.zone}`}</div>
                <div>
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
              <div />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
