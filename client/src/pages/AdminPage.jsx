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
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const [changedItemIndexArr, setChangedItemIndexArr] = useState([]);
  const [changedItemValueArr, setChangedItemValueArr] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const userCtx = useContext(UserContext);

  // Getting Data for the table

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

  // Next and Previous buttons

  const handlePrevClick = () => {
    if (changedItemIndexArr.length === 0) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      setErrorMessage(true);
    }
  };

  const handleNextClick = () => {
    if (changedItemIndexArr.length === 0) {
      if (currentPage < Math.ceil(services.length / itemsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      setErrorMessage(true);
    }
  };

  // Filter button

  function handleFilterButton(event, index) {
    if (changedItemIndexArr.length === 0) {
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
    } else {
      setErrorMessage(true);
    }
  }

  // Set status

  const absoluteIndex = (index) => (currentPage - 1) * itemsPerPage + index;

  const handleSelectChange = (event, index) => {
    setChangedItemIndexArr([...changedItemIndexArr, index]);
    const updatedChangedItemValueArr = changedItemValueArr.slice();
    const existingIndex = changedItemValueArr.findIndex((item) => item.index === index);

    if (existingIndex !== -1) {
      updatedChangedItemValueArr.splice(existingIndex, 1);
    }

    updatedChangedItemValueArr.push({ index: absoluteIndex(index), value: event.target.value });

    setChangedItemValueArr(updatedChangedItemValueArr);
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

  function dateFormatter(value) {
    if (value) {
      const newValue = new Date(value);
      const date = [
        (newValue.getDate() + 1).toString().padStart(2, '0'),
        (newValue.getMonth() + 1).toString().padStart(2, '0'),
        newValue.getFullYear(),
      ].join('.');
      return date;
    }
    return '-';
  }

  // Page leaving alert

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const e = event;
      if (changedItemIndexArr.length > 0) {
        const message =
          'You have unsaved changes. If you leave the page, your changes will be lost.';
        e.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
      return null;
    };
    if (changedItemIndexArr.length < 0) {
      window.addEventListener('beforeunload', (event) => {
        handleBeforeUnload(event);
      });
    }
  }, [changedItemIndexArr]);

  // Confirm button
  function handleConfirm(index) {
    const activeSelector = document.querySelectorAll('#status-selector')[index];
    const service = services[absoluteIndex(index)];
    const action = changedItemValueArr.filter((item) => item.index === index);
    const serviceFetch = async () => {
      const response = await fetch(
        `http://localhost:3000/admin/${action[0].value === 'returned' ? 'return' : 'cancel'}/${
          service.Users.id
        }`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: service.id,
          }),
        },
      );
      await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    };
    serviceFetch();

    if (action[0].value !== 'active') {
      activeSelector.setAttribute('id', `${action[0].value}`);
      activeSelector.setAttribute('disabled', '');
    }
    setErrorMessage(false);
    setChangedItemIndexArr(changedItemIndexArr.filter((item) => item !== index));
    setChangedItemValueArr(changedItemValueArr.filter((item) => item.index !== index));
  }

  const navigate = useNavigate();
  if (userCtx.user.role === 'ADMIN') {
    if (services) {
      if (!isLoading) {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);

        return (
          <div className="admin-page-container">
            <h1>Welcome {userCtx.user.firstName}!</h1>
            <div className="table-container">
              <div>
                <div className="filter-and-sortby-container">
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
                        <td>{dateFormatter(service.ServiceStartDate)}</td>
                        <td>{dateFormatter(service.ServiceEndDate)}</td>
                        <td>{dateFormatter(service.ActualServiceEndDate)}</td>
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
                            id="status-selector"
                            disabled={isDisabled(service)}
                            className={
                              changedItemIndexArr.includes(index)
                                ? 'color-change'
                                : defaultStatus(service)
                            }
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
                          {changedItemIndexArr.includes(index) && (
                            <button
                              className="confirm-button"
                              type="button"
                              onClick={() => handleConfirm(index)}
                            >
                              Confirm
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="next-and-previous-buttons">
                <button
                  type="button"
                  onClick={handlePrevClick}
                  disabled={currentPage === 1}
                  className={currentPage > 1 && 'active-move-button'}
                >
                  &larr; Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextClick}
                  disabled={currentPage === Math.ceil(services.length / itemsPerPage)}
                  className={
                    currentPage < Math.ceil(services.length / itemsPerPage) && 'active-move-button'
                  }
                >
                  Next &rarr;
                </button>
              </div>
              {errorMessage && <p className="save-reminder">Please save your changes</p>}
            </div>
          </div>
        );
      }
    }
    return <LoadingScreen />;
  }
  useEffect(() => {
    navigate('/');
  }, []);
}
export default AdminPage;
