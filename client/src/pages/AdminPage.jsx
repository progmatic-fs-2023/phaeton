import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LoadingScreen from '../components/ReusableComponents/LoadingScreen';
import UserContext from '../contexts/UserContext';
import SortByArrows from '../components/ReusableComponents/SortByArrows';
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
  const [searchTerm, setSearchTerm] = useState('');

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

  function dateFormatter(value, correction) {
    if (value) {
      const newValue = new Date(value);
      const date = [
        newValue.getFullYear(),
        (newValue.getMonth() + 1).toString().padStart(2, '0'),
        (newValue.getDate() - correction).toString().padStart(2, '0'),
      ].join('-');
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

  // Sort arrows

  function clickOnSortButton(direction, property) {
    let sortedServices;

    if ((direction === 'up' && property === 'id') || (direction === 'up' && property === 'name')) {
      sortedServices = [...services].sort((a, b) => a[property].localeCompare(b[property]));
    }

    if (
      (direction === 'down' && property === 'id') ||
      (direction === 'down' && property === 'name')
    ) {
      sortedServices = [...services].sort((a, b) => b[property].localeCompare(a[property]));
    }

    if (
      (direction === 'up' && property.includes('Service')) ||
      (direction === 'down' && property.includes('Service'))
    ) {
      sortedServices = [...services].sort((a, b) => {
        const dateA = new Date(a[property]);
        const dateB = new Date(b[property]);
        if (direction === 'up') {
          return dateA - dateB;
        }
        return dateB - dateA;
      });
    }

    if (
      (direction === 'up' && property === 'ActualServiceEndDate') ||
      (direction === 'down' && property === 'ActualServiceEndDate')
    ) {
      sortedServices = [...services].sort((a, b) => {
        const dateA = a[property] === null ? null : new Date(a[property]);
        const dateB = b[property] === null ? null : new Date(b[property]);

        if (dateA === null && dateB === null) {
          return 0;
        }
        if (dateA === null) {
          return 1;
        }
        if (dateB === null) {
          return -1;
        }

        if (direction === 'up') {
          return dateA > dateB ? 1 : -1;
        }
        return dateA < dateB ? 1 : -1;
      });
    }

    if (
      (direction === 'up' && property === 'zone') ||
      (direction === 'down' && property === 'zone')
    ) {
      sortedServices = [...services].sort((a, b) => {
        const zoneA = a.ParkingLot ? a.ParkingLot.zone : null;
        const zoneB = b.ParkingLot ? b.ParkingLot.zone : null;

        if (zoneA === null && zoneB === null) {
          return 0;
        }
        if (zoneA === null) {
          return 1;
        }
        if (zoneB === null) {
          return -1;
        }

        if (direction === 'up') {
          return zoneA.localeCompare(zoneB, undefined, { numeric: true, sensitivity: 'base' });
        }
        return zoneB.localeCompare(zoneA, undefined, { numeric: true, sensitivity: 'base' });
      });
    }

    if (
      (direction === 'up' && property === 'PhoneNumber') ||
      (direction === 'down' && property === 'PhoneNumber')
    ) {
      sortedServices = [...services].sort((a, b) => {
        const zoneA = a.PhoneNumber ? a.PhoneNumber : null;
        const zoneB = b.PhoneNumber ? b.PhoneNumber : null;

        if (zoneA === null && zoneB === null) {
          return 0;
        }
        if (zoneA === null) {
          return 1;
        }
        if (zoneB === null) {
          return -1;
        }

        if (direction === 'up') {
          return zoneA.localeCompare(zoneB, undefined, { numeric: true, sensitivity: 'base' });
        }
        return zoneB.localeCompare(zoneA, undefined, { numeric: true, sensitivity: 'base' });
      });
    }
    if (
      (direction === 'up' && property === 'zone') ||
      (direction === 'down' && property === 'zone')
    ) {
      sortedServices = [...services].sort((a, b) => {
        const zoneA = a.ParkingLot ? a.ParkingLot.zone : null;
        const zoneB = b.ParkingLot ? b.ParkingLot.zone : null;

        if (zoneA === null && zoneB === null) {
          return 0;
        }
        if (zoneA === null) {
          return 1;
        }
        if (zoneB === null) {
          return -1;
        }

        if (direction === 'up') {
          return zoneA.localeCompare(zoneB, undefined, { numeric: true, sensitivity: 'base' });
        }
        return zoneB.localeCompare(zoneA, undefined, { numeric: true, sensitivity: 'base' });
      });
    }

    if (
      (direction === 'up' && property === 'model') ||
      (direction === 'down' && property === 'model')
    ) {
      sortedServices = [...services].sort((a, b) => {
        const zoneA = a.Cars ? a.Cars.model : null;
        const zoneB = b.Cars ? b.Cars.model : null;

        if (zoneA === null && zoneB === null) {
          return 0;
        }
        if (zoneA === null) {
          return 1;
        }
        if (zoneB === null) {
          return -1;
        }

        if (direction === 'up') {
          return zoneA.localeCompare(zoneB, undefined, { numeric: true, sensitivity: 'base' });
        }
        return zoneB.localeCompare(zoneA, undefined, { numeric: true, sensitivity: 'base' });
      });
    }

    if (
      (direction === 'up' && property === 'IsActive') ||
      (direction === 'down' && property === 'IsActive')
    ) {
      const order = direction === 'up' ? 1 : -1;

      sortedServices = [...services].sort((a, b) => {
        if (a.IsActive && !b.IsActive) {
          return -1 * order;
        }
        if (!a.IsActive && b.IsActive) {
          return 1 * order;
        }

        if (a.IsActive === b.IsActive) {
          if (a.ActualServiceEndDate && !b.ActualServiceEndDate) {
            return -1 * order;
          }
          if (!a.ActualServiceEndDate && b.ActualServiceEndDate) {
            return 1 * order;
          }
        }

        return 0;
      });
    }
    setServices(sortedServices);
    setCurrentPage(1);
  }

  // Confirm button
  function handleConfirm(event, index) {
    const serviceId = event.target.parentNode.parentNode.querySelector('#service-id').innerHTML;
    const activeSelector = event.target.parentNode.parentNode.querySelector('#status-selector');

    const service = services.filter((serviceItem) => serviceItem.id === serviceId);
    const action = changedItemValueArr.filter((item) => item.index === absoluteIndex(index));

    const serviceFetch = async () => {
      const response = await fetch(
        `http://localhost:3000/admin/${action[0].value === 'returned' ? 'return' : 'cancel'}/${
          service[0].Users.id
        }`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: serviceId,
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

  const handleSearch = (event) => {
    if (changedItemIndexArr.length === 0) {
      setSearchTerm(event.target.value);
    } else setErrorMessage(true);
  };

  const navigate = useNavigate();
  if (userCtx.user.role === 'ADMIN') {
    if (services) {
      if (!isLoading) {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const filteredItems = services.filter((service) =>
          Object.values(service).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        );

        const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

        return (
          <div className="admin-page-container">
            <div className="searchbar">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
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
                      <th>
                        <div className="table-head-content">
                          ID
                          <div className="sort-arrow-container">
                            <SortByArrows
                              direction="up"
                              onClick={() => clickOnSortButton('up', 'id')}
                            />
                            <SortByArrows
                              direction="down"
                              onClick={() => clickOnSortButton('down', 'id')}
                            />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="table-head-content">
                          Start Date
                          <div className="sort-arrow-container">
                            <div className="sort-arrow-container">
                              <SortByArrows
                                direction="up"
                                onClick={() => clickOnSortButton('up', 'ServiceStartDate')}
                              />
                              <SortByArrows
                                direction="down"
                                onClick={() => clickOnSortButton('down', 'ServiceStartDate')}
                              />
                            </div>
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="table-head-content">
                          End Date
                          <div className="sort-arrow-container">
                            <SortByArrows
                              direction="up"
                              onClick={() => clickOnSortButton('up', 'ServiceEndDate')}
                            />
                            <SortByArrows
                              direction="down"
                              onClick={() => clickOnSortButton('down', 'ServiceEndDate')}
                            />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="table-head-content">
                          Actual End Date
                          <div className="sort-arrow-container">
                            <SortByArrows
                              direction="up"
                              onClick={() => clickOnSortButton('up', 'ActualServiceEndDate')}
                            />
                            <SortByArrows
                              direction="down"
                              onClick={() => clickOnSortButton('down', 'ActualServiceEndDate')}
                            />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="table-head-content parking-zone-table-head">
                          Parking Zone
                          <div className="sort-arrow-container">
                            <SortByArrows
                              direction="up"
                              onClick={() => clickOnSortButton('up', 'zone')}
                            />
                            <SortByArrows
                              direction="down"
                              onClick={() => clickOnSortButton('down', 'zone')}
                            />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="table-head-content">
                          Name
                          <div className="sort-arrow-container">
                            <SortByArrows
                              direction="up"
                              onClick={() => clickOnSortButton('up', 'name')}
                            />
                            <SortByArrows
                              direction="down"
                              onClick={() => clickOnSortButton('down', 'name')}
                            />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="table-head-content">
                          Car Model
                          <div className="sort-arrow-container">
                            <SortByArrows
                              direction="up"
                              onClick={() => clickOnSortButton('up', 'model')}
                            />
                            <SortByArrows
                              direction="down"
                              onClick={() => clickOnSortButton('down', 'model')}
                            />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="table-head-content">
                          Phone Number
                          <div className="sort-arrow-container">
                            <SortByArrows
                              direction="up"
                              onClick={() => clickOnSortButton('up', 'PhoneNumber')}
                            />
                            <SortByArrows
                              direction="down"
                              onClick={() => clickOnSortButton('down', 'PhoneNumber')}
                            />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="table-head-content">
                          Status
                          <div className="sort-arrow-container">
                            <SortByArrows
                              direction="up"
                              onClick={() => clickOnSortButton('up', 'IsActive')}
                            />
                            <SortByArrows
                              direction="down"
                              onClick={() => clickOnSortButton('down', 'IsActive')}
                            />
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((service, index) => (
                      <tr key={service.id}>
                        <td id="service-id">{service.id}</td>
                        <td>{dateFormatter(service.ServiceStartDate, 1)}</td>
                        <td>{dateFormatter(service.ServiceEndDate, 1)}</td>
                        <td>{dateFormatter(service.ActualServiceEndDate, 0)}</td>
                        <td>{service.ParkingLot ? service.ParkingLot.zone : '-'}</td>
                        <td>{service.name}</td>
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
                              onClick={(event) => handleConfirm(event, index)}
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
                  className={currentPage > 1 ? 'active-move-button' : ''}
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
              <div className="save-reminder-container">
                {errorMessage && <p className="save-reminder">Please save your changes</p>}
              </div>
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
