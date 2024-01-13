import { useParams } from 'react-router';
import '../styles/Booking/ParkingBookingDetails.css';

function ParkingBookingDetails() {
  const { startDate, endDate, zone } = useParams();

  // formatting date to DD-MM-YYYY
  function formatDateString(inputDate) {
    const day = inputDate.substring(0, 2);
    const month = inputDate.substring(2, 4);
    const year = inputDate.substring(4, 8);

    return `${day}-${month}-${year}`;
  }

  const formattedStartDate = formatDateString(startDate);
  const formattedEndDate = formatDateString(endDate);

  return (
    <div className="end-booking-details">
        <h2>Confirm your booking:</h2>
        <div>{`From ${formattedStartDate} to ${formattedEndDate}`}</div>
        <div>{`One spot in zone: ${zone}`}</div>
        <button type="submit">Book Now</button>
      </div>
  );
}
export default ParkingBookingDetails;
