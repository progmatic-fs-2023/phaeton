import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';

function valuetext(value) {
  return { value };
}

const minDistance = 1;

export default function TrunkCapacity({ getTypeData, getFilterData }) {
  TrunkCapacity.propTypes = {
    getTypeData: PropTypes.func.isRequired,
    getFilterData: PropTypes.func.isRequired,
  };

  const startNr = 1;
  const endNr = 8;
  const steps = 1;

  const [value, setValue] = React.useState([startNr, endNr]);

  const marks = [
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
  ];

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      getFilterData(value);
      getTypeData('trunk');
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      getFilterData(value);
      getTypeData('trunk');
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
