import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';

function valuetext(value) {
  return { value };
}

const minDistance = 1;

export default function PriceSlider({
  getTypeData,
  getFilterData,
}) {
  PriceSlider.propTypes = {
    getTypeData: PropTypes.func.isRequired,
    getFilterData: PropTypes.func.isRequired,
  };

  const startNr = 11000
  const endNr= 20000
  const steps= 1000

  const [value, setValue] = React.useState([startNr, endNr]);

  const marks = [
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
      value: 20000,
      label: 20000,
    },
  ];

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      getFilterData(value);
      getTypeData('price');
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      getFilterData(value);
      getTypeData('price');
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
