import React from 'react';
import './styles/SortBy.css';
import PropTypes from 'prop-types';

function SortBy({ handleSortingFunction }) {
  SortBy.propTypes = {
    handleSortingFunction: PropTypes.func.isRequired,
  };

  const handleListItemClick = (value) => {
    handleSortingFunction(value); // Pass the selected value to the sorting function
    document.getElementById('myDropdown').classList.remove('show'); // Close the dropdown
  };

  return (
    <div className="dropdown">
      <button
        type="button"
        onClick={() => document.getElementById('myDropdown').classList.toggle('show')}
        className="dropbtn"
      >
        <span className="material-symbols-outlined">sort</span> Sort by
      </button>
      <div id="myDropdown" className="dropdown-content">
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
