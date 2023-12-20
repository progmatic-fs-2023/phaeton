import React, { useState,  useContext } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import './styles/DatePicker.css';
import './styles/Calendar.css';
import calendarSVG from '../assets/DatePicker/calendar.svg';
import arrow from '../assets/DatePicker/arrow.svg';
import BackGroundContext from '../contexts/BackgroundContext';

function DatePicker({ getStartDate, getEndDate }) {
  const current = new Date();
  const followingDay = new Date(current.getTime() + 172800000);
  const parkingBg = useContext(BackGroundContext)

  const [fromValue, setFromValue] = useState(current);
  const [toValue, setToValue] = useState(followingDay);
  const [option, setOption] = useState('');

  const calendarDialog =  document.getElementById('calendar-dialog')

  function openCalendar(prop) {
    calendarDialog.showModal();
    setOption(prop);
  }

  function onDateChange(date) {
    if (option === 'start') {
      setFromValue(date);
    } else if (option === 'end') {
      setToValue(date);
    }
    calendarDialog.close()
  }

  function onSearch() {
    getStartDate(fromValue);
    getEndDate(toValue);
  }

  function dateFormatter(value) {
    const date = [
      value.getDate(),
      value.toLocaleString('default', { month: 'short' }),
      value.getFullYear(),
    ].join(' ');
    return date
  }

  return (
    <div className={`component-background ${parkingBg}`}>
      <div className="date-picker-main-container">
        <div className="date-picker-container">
          <button
            className="date-picker-button"
            type="button"
            onClick={() => openCalendar('start')}
          >
            <img src={calendarSVG} alt="calendar" />
            {dateFormatter(fromValue)}
          </button>
          <img src={arrow} className="arrow" alt="arrow" />
          <button className="button date-picker-button" type="button" onClick={() => openCalendar('end')}>
            <img src={calendarSVG} alt="calendar" />
            {dateFormatter(toValue)}
          </button>
          <button type="button" className="button search-button" onClick={onSearch}>
            Search
          </button>
        </div>
      </div>
          <dialog id="calendar-dialog">
            <Calendar className="date-picker-calendar" onChange={onDateChange} value={fromValue} />
          </dialog>
    </div>
  );
}

export default DatePicker;
