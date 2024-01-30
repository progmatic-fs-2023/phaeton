import React, { useState, useContext, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { useParams } from 'react-router-dom';
import dateFormatter from '../../utils/dateFormatter';
import BackGroundContext from '../../contexts/BackgroundContext';
import 'react-calendar/dist/Calendar.css';
import '../styles/ReusableComponents/DatePicker.css';
import '../styles/ReusableComponents/Calendar.css';
import calendarSVG from '../../assets/DatePicker/calendar.svg';
import arrow from '../../assets/DatePicker/arrow.svg';
import getSomeYearsAgo from '../../utils/getSomeYearsAgo';

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
  const [IsVisible, setIsVisible] = useState('non-visible');
  const [isBlurred, setIsBlurred] = useState('');
  const parkingBg = useContext(BackGroundContext);
  const calendarDialog = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarDialog.current && !calendarDialog.current.contains(event.target)) {
        setIsVisible('non-visible');
        setIsBlurred('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function openCalendar() {
    setIsVisible('visible');
    setIsBlurred('blurred');
  }

  function onDateChange(date) {
    const fromDate = new Date(date[0].getFullYear(), date[0].getMonth(), date[0].getDate());
    const toDate = new Date(date[1].getFullYear(), date[1].getMonth(), date[1].getDate());
  
    if(fromDate >= toDate){
      setToValue(new Date(fromDate.getTime() + 86400000));
    } else {
      setToValue(toDate);
    }
    setFromValue(fromDate);
    setIsVisible('non-visible');
    setIsBlurred('');
  }
  

  const HandleEndDateChange = useCallback(
    (date) => {
      onDateChange(date);
    },
    [onDateChange],
  );

  return (
    <div>
      {isBlurred === 'blurred' && <div className="overlay" />}
      <div className={`${parkingBg} ${isBlurred}`}>
        <div>
          <div className="date-picker-container" id={parkingBg}>
        <p  className="help" title="The minimum duration for this service is one day.">?</p>
            <button className="date-picker-button" type="button" onClick={() => openCalendar()}>
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
              onClick={() => openCalendar()}
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
                if (fromValue >= toValue) {
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
      </div>
      <div className={IsVisible} ref={calendarDialog}>
        <Calendar
          className="date-picker-calendar"
          onChange={HandleEndDateChange}
          selectRange
          minDate={fromValue}
          maxDate={new Date(getSomeYearsAgo(-1))}
        />
      </div>
    </div>
  );
}
DatePicker.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default DatePicker;
