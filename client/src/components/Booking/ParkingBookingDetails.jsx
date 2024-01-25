import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import '../styles/Booking/ParkingBookingDetails.css';
import numberWithSpaces from '../../utils/numberWithSpaces';
import dateFormatter from '../../utils/dateFormatter';

function ParkingBookingDetails() {
  const navigate = useNavigate();
  const { startDate, endDate, zone, spots } = useParams();

  // formatting date to YYYY-MM-DD
  function formatDateString(inputDate) {
    const day = inputDate.substring(0, 2);
    const month = inputDate.substring(2, 4);
    const year = inputDate.substring(4, 8);

    return `${year}-${month}-${day}`;
  }

  function getDaysBetweenDates(fromDate, toDate) {
    // One day in milliseconds
    const oneDay = 24 * 60 * 60 * 1000;

    // Calculate the difference in milliseconds
    const diffMilliseconds = Math.abs(dateFormatter(toDate) - dateFormatter(fromDate));

    // Convert back to days and return
    return Math.round(diffMilliseconds / oneDay);
  }

  const formattedStartDate = formatDateString(startDate);
  const formattedEndDate = formatDateString(endDate);
  function onBook(event) {
    event.preventDefault();
    navigate(`/parking/from/${startDate}/end/${endDate}/zone/${zone}/spots/${spots}/form`);
  }

  return (
    <div className="end-booking-details">
      <h2>Confirm your booking:</h2>
      <div>{`From ${formattedStartDate} to ${formattedEndDate}`}</div>
      <div>{`${spots} spot in zone: ${zone}`}</div>
      <p>Price: {numberWithSpaces(getDaysBetweenDates(startDate, endDate) * 3000)} HUF</p>
      <button type="submit" onClick={onBook}>
        Confirm
      </button>
    </div>
  );
}
export default ParkingBookingDetails;
