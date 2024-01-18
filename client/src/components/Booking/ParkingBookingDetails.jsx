import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import '../styles/Booking/ParkingBookingDetails.css';

function ParkingBookingDetails() {
  const navigate = useNavigate();
  const { startDate, endDate, zone, parkings } = useParams();

  // formatting date to DD-MM-YYYY
  function formatDateString(inputDate) {
    const day = inputDate.substring(0, 2);
    const month = inputDate.substring(2, 4);
    const year = inputDate.substring(4, 8);

    return `${year}-${month}-${day}`;
  }

  const formattedStartDate = formatDateString(startDate);
  const formattedEndDate = formatDateString(endDate);

  function onBook(event) {
    event.preventDefault();
    navigate(
      `/parking/from/${startDate}/end/${endDate}/zone/${zone}/parkings/${parkings.length}/form`,
    );
  }

  return (
    <div className="end-booking-details">
      <h2>Confirm your booking:</h2>
      <div>{`From ${formattedStartDate} to ${formattedEndDate}`}</div>
      <div>{`${parkings} spot in zone: ${zone}`}</div>
      <button type="submit" onClick={onBook}>
        Book Now
      </button>
    </div>
  );
}
export default ParkingBookingDetails;
