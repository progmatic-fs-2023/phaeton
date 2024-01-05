import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';

function valuetext(value) {
  return { value };
}

const minDistance = 1;

export default function SliderFilter({ getFilterData, startNr, endNr, steps, marks, type }) {
  SliderFilter.propTypes = {
    getFilterData: PropTypes.func.isRequired,
    startNr: PropTypes.number.isRequired,
    endNr: PropTypes.number.isRequired,
    steps: PropTypes.number.isRequired,
    marks: PropTypes.arrayOf.isRequired,
    type: PropTypes.string.isRequired,
  };

  const [value, setValue] = React.useState([startNr, endNr]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      getFilterData(value, type);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      getFilterData(value, type);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        step={steps}
        marks={marks}
        min={startNr}
        max={endNr}
      />
    </Box>
  );
}
