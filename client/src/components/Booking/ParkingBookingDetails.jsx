import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import '../styles/Booking/ParkingBookingDetails.css';
import numberWithSpaces from '../../utils/numberWithSpaces';
import getDaysBetweenDates from '../../utils/getDaysBetweenDates';
import dateFormatWithDots from '../../utils/dateFormatWithDots';
import BackButton from '../ReusableComponents/BackButton';

function ParkingBookingDetails() {
  const navigate = useNavigate();
  const { startDate, endDate, zone, spots } = useParams();

  const price = numberWithSpaces(getDaysBetweenDates(startDate, endDate) * 3000);
  const formattedStartDate = dateFormatWithDots(startDate);
  const formattedEndDate = dateFormatWithDots(endDate);
  function onBook(event) {
    event.preventDefault();
    navigate(`/parking/from/${startDate}/end/${endDate}/zone/${zone}/spots/${spots}/form`);
  }
  return (
    <div>
      <BackButton />
      <div className="end-booking-details">
        <h2>Confirm your booking:</h2>
        <div>{`From ${formattedStartDate} to ${formattedEndDate}`}</div>
        <div>{`${spots} spot in zone: ${zone}`}</div>
        <p>Each parking spot price: {price} HUF</p>
        <button type="submit" onClick={onBook}>
          Confirm
        </button>
      </div>
    </div>
  );
}
export default ParkingBookingDetails;
