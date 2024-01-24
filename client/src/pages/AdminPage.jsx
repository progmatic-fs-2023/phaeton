import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LoadingScreen from '../components/ReusableComponents/LoadingScreen';
import UserContext from '../contexts/UserContext';
import '../components/styles/Pages/AdminPage.css';

function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [originalServices, setOriginalServices] = useState(null);
  const [services, setServices] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilterIndex, setActiveFilterIndex] = useState(null);

  const userCtx = useContext(UserContext);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/admin/services/${userCtx.user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    setServices(data.result);
    setOriginalServices(data.result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < Math.ceil(services.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  function handleFilterButton(event, index) {
    let filteredData;
    if (event.target.innerHTML === 'Rents') {
      filteredData = originalServices.filter((service) => service.Cars);
    } else if (event.target.innerHTML === 'Parkings') {
      filteredData = originalServices.filter((service) => service.ParkingLot);
    } else {
      filteredData = originalServices;
    }
    setActiveFilterIndex(index);
    setServices(filteredData);
    setCurrentPage(1);
  }

  const handleSelectChange = (event, index) => {
    if (event.target.value !== 'active') {
      console.log(index);
    }
  };

  function isDisabled(service) {
    let boolean = false;
    if (service.IsActive === false) {
      boolean = true;
    }
    return boolean;
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
  if (!isLoading) {
    if (services) {
      if (userCtx.user.role === 'ADMIN') {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);

        return (
          <div className="admin-page-container">
            <h1>Welcome {userCtx.user.firstName}!</h1>
            <label htmlFor="item-per-page">
              Items per Page
              <select
                id="item-per-page"
                onChange={(event) => {
                  setItemsPerPage(event.target.value);
                }}
                name="item-per-page"
              >
                <option>10</option>
                <option>15</option>
                <option>25</option>
                <option>50</option>
              </select>
            </label>
            <div className="admin-page-filter-button">
              {['All', 'Parkings', 'Rents'].map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  onClick={(event) => handleFilterButton(event, index)}
                  className={activeFilterIndex === index ? 'active-filter' : ''}
                >
                  {filter}
                </button>
              ))}
            </div>
            <table className="services-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actual End Date</th>
                  <th>Parking Zone</th>
                  <th>Name</th>
                  <th>Car Model</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((service, index) => (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{dateFormatter2(service.ServiceStartDate)}</td>
                    <td>{dateFormatter2(service.ServiceEndDate)}</td>
                    <td>{dateFormatter2(service.ActualServiceEndDate)}</td>
                    <td>{service.ParkingLot ? service.ParkingLot.zone : '-'}</td>
                    <td>
                      {service.Users.firstName} {service.Users.lastName}
                    </td>
                    <td>{service.Cars ? service.Cars.model : '-'}</td>
                    <td>
                      <a href={`tel:${service.PhoneNumber}`}>{service.PhoneNumber}</a>
                    </td>
                    <td>
                      <select
                        disabled={isDisabled(service)}
                        className={defaultStatus(service)}
                        defaultValue={defaultStatus(service)}
                        onChange={(event) => handleSelectChange(event, index)}
                      >
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
            <div>
              {currentPage > 1 && (
                <button type="button" onClick={handlePrevClick}>
                  Previous
                </button>
              )}
              {currentPage < Math.ceil(services.length / itemsPerPage) && (
                <button type="button" onClick={handleNextClick}>
                  Next
                </button>
              )}
            </div>
          </div>
        );
      }
      useEffect(() => {
        navigate('/');
      }, []);
    }
  }
  return <LoadingScreen />;
}
export default AdminPage;
