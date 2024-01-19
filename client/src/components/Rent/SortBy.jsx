import React, { useEffect, useRef, useState } from 'react';
import '../styles/Rent/SortBy.css';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

function SortBy({ handleSortingFunction }) {
  SortBy.propTypes = {
    handleSortingFunction: PropTypes.func.isRequired,
  };

  const [currentSortByValue, setCurrentSortByValue] = useState('Name A-Z');

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleListItemClick = (event, value) => {
    handleSortingFunction(value);
    dropdownRef.current.classList.remove('show');
    setCurrentSortByValue(event.target.innerHTML);
    setSearchParams({ sort: value });
  };

  useEffect(() => {
    if (searchParams.get('sort')) {
      handleSortingFunction(searchParams.get('sort'));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        dropdownRef.current.classList.remove('show');
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => dropdownRef.current.classList.toggle('show')}
        className="dropbtn"
      >
        <span className="material-symbols-outlined">sort</span> {`Sort by (${currentSortByValue})`}
      </button>
      <div ref={dropdownRef} id="myDropdown" className="dropdown-content">
        <button
          className="sortByElem"
          type="button"
          onClick={(event) => handleListItemClick(event, 'name-a-z')}
        >
          Name A-Z
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={(event) => handleListItemClick(event, 'name-z-a')}
        >
          Name Z-A
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={(event) => handleListItemClick(event, 'cheapest')}
        >
          Price lowest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={(event) => handleListItemClick(event, 'most-expensive')}
        >
          Price highest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={(event) => handleListItemClick(event, 'least-seats')}
        >
          Seat quantity lowest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={(event) => handleListItemClick(event, 'most-seats')}
        >
          Seat quantity highest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={(event) => handleListItemClick(event, 'least-luggage')}
        >
          Trunk capacity Lowest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={(event) => handleListItemClick(event, 'most-luggage')}
        >
          Trunk capacity highest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={(event) => handleListItemClick(event, 'least-power')}
        >
          Engine Power Lowest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={(event) => handleListItemClick(event, 'most-power')}
        >
          Engine Power highest first
        </button>
      </div>
    </div>
  );
}

export default SortBy;
