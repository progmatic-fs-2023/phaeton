import React, { useEffect, useRef } from 'react';
import './styles/SortBy.css';
import PropTypes from 'prop-types';

function SortBy({ handleSortingFunction }) {
  SortBy.propTypes = {
    handleSortingFunction: PropTypes.func.isRequired,
  };

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleListItemClick = (value) => {
    handleSortingFunction(value);
    dropdownRef.current.classList.remove('show');
  };

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
        <span className="material-symbols-outlined">sort</span> Sort by
      </button>
      <div ref={dropdownRef} id="myDropdown" className="dropdown-content">
        <button
          className="sortByElem"
          type="button"
          onClick={() => handleListItemClick('name-a-z')}
        >
          Name A-Z
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={() => handleListItemClick('name-z-a')}
        >
          Name Z-A
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={() => handleListItemClick('cheapest')}
        >
          Price lowest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={() => handleListItemClick('most-expensive')}
        >
          Price highest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={() => handleListItemClick('least-seats')}
        >
          Seat quantity lowest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={() => handleListItemClick('most-seats')}
        >
          Seat quantity highest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={() => handleListItemClick('least-luggage')}
        >
          Trunk capacity Lowest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={() => handleListItemClick('most-luggage')}
        >
          Trunk capacity highest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={() => handleListItemClick('least-power')}
        >
          Engine Power Lowest first
        </button>
        <button
          className="sortByElem"
          type="button"
          onClick={() => handleListItemClick('most-power')}
        >
          Engine Power highest first
        </button>
      </div>
    </div>
  );
}

export default SortBy;
