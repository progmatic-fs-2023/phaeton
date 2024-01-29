import PropTypes from 'prop-types';
import '../styles/ReusableComponents/SortByArrows.css';

function SortByArrows({ direction, onClick }) {
  return (
    <button className="sort-arrow" type="button" onClick={onClick}>
      {direction === 'up' ? '▲' : '▼'}
    </button>
  );
}

SortByArrows.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SortByArrows;
