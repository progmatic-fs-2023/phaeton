import { useNavigate } from 'react-router-dom';
import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';
import '../components/styles/Parking.css';

function Parking() {
  const navigate = useNavigate();

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}${month}${year}`;
  }
  const onSearchFn = (startDate, endDate) => {
    if (startDate && endDate) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      navigate(`/parking/from/${formattedStartDate}/end/${formattedEndDate}`);
    }
  }, [startDate, endDate, navigate]);

  if (!startDate && !endDate) {
    return (
      <div>
        <h1 className="page-title mobile">Parking</h1>
        <h1 className="page-title desktop">Parking - Secure your Car While You&apos;re Away</h1>
        <BackGroundContext.Provider value="component-background parking-bg">
          <DatePicker getStartDate={handleGetStartDate} getEndDate={handleGetEndDate} />
        </BackGroundContext.Provider>
      </div>
    );
  }
}

export default Parking;
