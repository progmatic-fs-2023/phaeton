import '../../components/styles/Rent/Rent.css';
import { useNavigate } from 'react-router-dom';
import DatePicker from '../../components/ReusableComponents/DatePicker';
import BackGroundContext from '../../contexts/BackgroundContext';
import useDocumentTitle from '../../components/ReusableComponents/useDocumentTitle';
import formatDate from '../../hooks/formatDate';
function Rent() {
  useDocumentTitle('Phaeton · Rent');

  const navigate = useNavigate();

  const onSearchFn = (startDate, endDate) =>
    startDate &&
    endDate &&
    navigate(`/rental/from/${formatDate(startDate)}/end/${formatDate(endDate)}`);

  return (
    // Component with the background
    <div>
      <BackGroundContext.Provider value="component-background rental-bg">
        <h1 className="page-title mobile">Car Rental</h1>
        <h1 className="page-title desktop">Car Rental - Choose a Car for Your Needs</h1>
        <DatePicker
          onSearch={(startDate, endDate) => {
            onSearchFn(startDate, endDate);
          }}
        />
      </BackGroundContext.Provider>
    </div>
  );

  // Page with the date values
}
export default Rent;
