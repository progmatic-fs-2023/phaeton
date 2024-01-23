import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import UserContext from '../contexts/UserContext';
import '../components/styles/Pages/AdminPage.css';

function AdminPage() {
  const services = [
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: false,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: true,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: null,
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: false,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: true,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T13:20:44.743Z',
      ActualServiceEndDate: null,
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: false,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: true,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: true,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: false,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: null,
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: false,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: false,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: true,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: true,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: true,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: true,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: true,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: true,
    },
    {
      id: 'clqp9j5ph0000c6qv5vwaj1r5',
      ServiceStartDate: '2023-12-23T19:24:08.008Z',
      ServiceEndDate: '2023-12-29T19:24:08.743Z',
      ActualServiceEndDate: '2023-12-29T13:20:44.743Z',
      ParkingZone: 'A',
      userName: 'Lacika László',
      carModelName: 'Ford Fiesta',
      PhoneNumber: '+363012345678',
      IsActive: true,
    },
  ];

  function isDisabled(service) {
    let boolean = false
    if (service.IsActive === false) {
      boolean = true
    } return boolean
  }

  function defaultStatus(service) {
    let status;
    if (service.IsActive === true) {
      status = 'active';
    } else if (service.IsActive === false && service.ActualServiceEndDate !== null) {
      status = 'returned';
    } else if (service.IsActive === false && service.ActualServiceEndDate === null) {
      status = 'canceled';
    }
    return status;
  }

  // const [selectBg, setSelectBg] = useState("")

  function dateFormatter2(value) {
    if (value) {
      const newValue = new Date(value);
      const date = [
        newValue.getDate(),
        newValue.toLocaleString('default', { month: 'short' }),
        newValue.getFullYear(),
      ].join(' ');
      return date;
    }
    return '-';
  }

  const navigate = useNavigate();

  const userCtx = useContext(UserContext);
  if (userCtx.user.role === 'ADMIN') {
    return (
      <div className="admin-page-container">
        <h1>Welcome {userCtx.user.firstName}!</h1>
        <table className="services-table">
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Service Start Date</th>
              <th>Service End Date</th>
              <th>Actual Service End Date</th>
              <th>Parking Zone</th>
              <th>Name</th>
              <th>Car Model</th>
              <th>Phone Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{dateFormatter2(service.ServiceStartDate)}</td>
                <td>{dateFormatter2(service.ServiceEndDate)}</td>
                <td>{dateFormatter2(service.ActualServiceEndDate)}</td>
                <td>{service.ParkingZone}</td>
                <td>{service.userName}</td>
                <td>{service.carModelName}</td>
                <td>
                  <a href={`tel:${service.PhoneNumber}`}>{service.PhoneNumber}</a>
                </td>
                <td>
                  {/* {service.IsActive.toString()} */}
                  <select disabled={isDisabled(service)} className={defaultStatus(service)} defaultValue={defaultStatus(service)}>
                    <option className="active" value="active">
                      Active
                    </option>
                    <option className="returned" value="returned">
                      Returned
                    </option>
                    <option className="canceled" value="canceled">
                      Canceled
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  useEffect(() => {
    navigate('/');
  }, []);
}

export default AdminPage;
