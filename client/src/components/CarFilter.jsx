import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './styles/CarFilter.css';
import SeatsSlider from './Sliders/SeatsSlider';
import PriceSlider from './Sliders/PriceSlider';
import TrunkCapacity from './Sliders/TrunkCapacitySlider';
import PowerSlider from './Sliders/PowerSlider';

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

  const [typeData, setTypeData] = useState([]);

  function filterData(data) {
    const newData = [...data, typeData];
    filteringCars(newData);
  }

  const handlefilterData = useCallback(
    (data) => {
      filterData(data);
    },
    [filterData],
  );

  function getTypeData(data) {
    setTypeData(data);
  }

  const handleGetTypeData = useCallback(
    (data) => {
      getTypeData(data);
    },
    [getTypeData],
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
          <label htmlFor="diesel">
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
          <label htmlFor="diesel">
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
          <SeatsSlider
            getTypeData={handleGetTypeData}
            getFilterData={handlefilterData}
            startNr={2}
            endNr={9}
            steps={1}
          />
        </div>
      </div>
      <div className="filter-container price">
        <h3>Price</h3>
        <div className="slider">
          <PriceSlider getTypeData={handleGetTypeData} getFilterData={handlefilterData} />
        </div>
      </div>
      <div className="filter-container seat-quantity">
        <h3>Trunk capacity</h3>
        <div className="slider">
          <TrunkCapacity getTypeData={handleGetTypeData} getFilterData={handlefilterData} />
        </div>
      </div>
      <div className="filter-container seat-quantity">
        <h3>Power</h3>
        <div className="slider">
          <PowerSlider getTypeData={handleGetTypeData} getFilterData={handlefilterData} />
        </div>
      </div>
    </div>
  );
}

export default CarFilter;
