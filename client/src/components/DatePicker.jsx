import React, { useState, useContext, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { useParams } from 'react-router-dom';
import dateFormatter from '../hooks/dateFormatter';
import BackGroundContext from '../contexts/BackgroundContext';
import 'react-calendar/dist/Calendar.css';
import './styles/ReusableComponents/DatePicker.css';
import './styles/ReusableComponents/Calendar.css';
import calendarSVG from '../assets/DatePicker/calendar.svg';
import arrow from '../assets/DatePicker/arrow.svg';

function DatePicker({ onSearch }) {
  const current = new Date();
  function dateFormatter2(value) {
    const newValue = new Date(value);
    const date = [
      newValue.getDate(),
      newValue.toLocaleString('default', { month: 'short' }),
      newValue.getFullYear(),
    ].join(' ');

    return date;
  }
  const followingDay = new Date(current.getTime() + 86400000);
  const followingDay2 = new Date(current.getTime() + 172800000);
  const { startDate, endDate } = useParams();

  const [fromValue, setFromValue] = useState(!startDate ? current : dateFormatter(startDate));

  const [toValue, setToValue] = useState(!startDate ? followingDay2 : dateFormatter(endDate));
  const [option, setOption] = useState('');
  const parkingBg = useContext(BackGroundContext);
  const calendarDialog = useRef(null);

  function openCalendar(prop) {
    calendarDialog.current.showModal();
    setOption(prop);
  }

  function onDateChange(date) {
    if (option === 'start') {
      setFromValue(date);
    } else if (option === 'end') {
      setToValue(date);
    }
    calendarDialog.current.close();
  }

  const HandleEndDateChange = useCallback(
    (date) => {
      onDateChange(date);
    },
    [onDateChange],
  );

  return (
    <div className={parkingBg}>
      <div className="date-picker-main-container">
        <div className="date-picker-container" id={parkingBg}>
          <button
            className="date-picker-button"
            type="button"
            onClick={() => openCalendar('start')}
          >
            <p>Departure</p>
            <div>
              <img src={calendarSVG} alt="calendar" />
              {dateFormatter2(fromValue)}
            </div>
          </button>
          <img src={arrow} className="arrow" alt="arrow" />
          <button
            className="button date-picker-button"
            type="button"
            onClick={() => openCalendar('end')}
          >
            <p>Return</p>
            <div>
              <img src={calendarSVG} alt="calendar" />
              {dateFormatter2(toValue)}
            </div>
          </button>
          <button
            type="button"
            className="button search-button"
            onClick={() => {
              if (fromValue > toValue) {
                onSearch(current, followingDay);
              } else {
                onSearch(fromValue, toValue);
              }
            }}
          >
            Search
          </button>
        </div>
      </div>
      <dialog id="calendar-dialog" ref={calendarDialog}>
        <Calendar
          className="date-picker-calendar"
          onChange={HandleEndDateChange}
          value={fromValue}
        />
      </dialog>
    </div>
  );
}
DatePicker.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default DatePicker;
