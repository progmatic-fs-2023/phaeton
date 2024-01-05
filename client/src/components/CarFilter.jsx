import React, { useCallback } from 'react';

import PropTypes from 'prop-types';
import './styles/CarFilter.css';
import SliderFilter from './SliderFilter';

function CarFilter({ dieselRef, petrolRef, electricRef, filteringCars }) {
  // These refs are not meant to have default values. They are initialized with null and then get assigned the DOM elements during the component’s lifecycle.

  CarFilter.propTypes = {
    // eslint-disable-next-line react/require-default-props
    dieselRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    // eslint-disable-next-line react/require-default-props
    petrolRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    // eslint-disable-next-line react/require-default-props
    electricRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    filteringCars: PropTypes.func.isRequired,
  };

  function filterData(data, type) {
    const newData = [...data, type];
    filteringCars(newData);
    console.log(newData);
  }
  const handlefilterData = useCallback(
    (data, type) => {
      filterData(data, type);
    },
    [filterData],
  );

  return (
    <div className="filter-main-container">
      <div className="filter-main-container-title">
        <h2>Filters</h2>
        <span className="material-symbols-outlined">tune</span>
      </div>
      <div className="filter-container fuel-type">
        <h3>Fuel-type</h3>
        <div className="filter-items">
          <label htmlFor="diesel">
            <input
              type="checkbox"
              ref={dieselRef}
              value="diesel"
              id="diesel"
              name="fuel-type"
              onClick={filteringCars}
            />
            Diesel
          </label>
          <label htmlFor="petrol">
            <input
              type="checkbox"
              ref={petrolRef}
              value="petrol"
              id="petrol"
              name="fuel-type"
              onClick={filteringCars}
            />
            Petrol
          </label>
          <label htmlFor="electric">
            <input
              type="checkbox"
              ref={electricRef}
              value="electric"
              id="electric"
              name="fuel-type"
              onClick={filteringCars}
            />
            Electric
          </label>
        </div>
      </div>
      <div className="filter-container seat-quantity">
        <h3>Seats</h3>
        <div className="slider">
          <SliderFilter
            getFilterData={handlefilterData}
            startNr={2}
            endNr={9}
            steps={1}
            marks={[
              {
                value: 2,
                label: '2',
              },
              {
                value: 3,
              },
              {
                value: 4,
              },
              {
                value: 5,
              },
              {
                value: 6,
              },
              {
                value: 7,
              },
              {
                value: 8,
              },
              {
                value: 9,
                label: '9',
              },
            ]}
            type="seats"
          />
        </div>
      </div>
      <div className="filter-container price">
        <h3>Price</h3>
        <div className="slider">
          <SliderFilter
            getFilterData={handlefilterData}
            startNr={1}
            endNr={8}
            steps={1}
            marks={[
              {
                value: 1,
                label: '1',
              },
              {
                value: 2,
              },
              {
                value: 3,
              },
              {
                value: 4,
              },
              {
                value: 5,
              },
              {
                value: 6,
              },
              {
                value: 7,
              },
              {
                value: 8,
                label: '8',
              },
            ]}
            type="trunk"
          />
        </div>
      </div>
      <div className="filter-container seat-quantity">
        <h3>Trunk capacity</h3>
        <div className="slider">
          <SliderFilter
            getFilterData={handlefilterData}
            startNr={11000}
            endNr={20000}
            steps={1000}
            marks={[
              {
                value: 11000,
                label: '11000',
              },
              {
                value: 12000,
              },
              {
                value: 13000,
              },
              {
                value: 14000,
              },
              {
                value: 15000,
              },
              {
                value: 16000,
              },
              {
                value: 17000,
              },
              {
                value: 18000,
              },
              {
                value: 19000,
              },
              {
                value: 20000,
                label: 20000,
              },
            ]}
            type="price"
          />
        </div>
      </div>
      <div className="filter-container seat-quantity">
        <h3>Power</h3>
        <div className="slider">
          <SliderFilter
            getFilterData={handlefilterData}
            startNr={50}
            endNr={200}
            steps={25}
            marks={[
              {
                value: 50,
                label: '50',
              },
              {
                value: 75,
              },
              {
                value: 100,
              },
              {
                value: 125,
              },
              {
                value: 150,
              },
              {
                value: 175,
              },
              {
                value: 200,
                label: '200',
              },
            ]}
            type="power"
          />
        </div>
      </div>
    </div>
  );
}

export default CarFilter;
