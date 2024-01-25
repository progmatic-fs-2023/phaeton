import { React, useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router';
import dateFormatterWithHyphen from '../../hooks/dateFromatterWhitHyphen';

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
        console.log(data);
        setUserServices(data);
      });
  }, []);
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
                  <button>Cancel</button>
                </div>
              </div>
              <div></div>
            </div>
          );
        }
      })}
    </div>
  );
}
