import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';

function valuetext(value) {
  return { value };
}

const minDistance = 25;

export default function PowerSlider({ getTypeData, getFilterData }) {
  PowerSlider.propTypes = {
    getTypeData: PropTypes.func.isRequired,
    getFilterData: PropTypes.func.isRequired,
  };

  const startNr = 50;
  const endNr = 200;
  const steps = 25;

  const [value, setValue] = React.useState([startNr, endNr]);

  const marks = [
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
  ];

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      getFilterData(value);
      getTypeData('power');
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      getFilterData(value);
      getTypeData('power');
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
