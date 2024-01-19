// ParkingSpotsInput.js
import React from 'react';
import PropTypes from 'prop-types';

function ParkingSpotsInput({ value, onChange }) {
  return (
    <div className="parkingzones-input-container">
      <label htmlFor="parking">
        Selected number of parking spots:
        <input
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          value={value}
          type="number"
          id="parking"
          name="parking-spot-selector"
          min="1"
          max="99"
        />
      </label>
    </div>
  );
}
ParkingSpotsInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default ParkingSpotsInput;
