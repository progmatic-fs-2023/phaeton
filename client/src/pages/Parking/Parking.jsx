import { useNavigate } from 'react-router-dom';
import DatePicker from '../../components/ReusableComponents/DatePicker';
import BackGroundContext from '../../contexts/BackgroundContext';
import '../../components/styles/Parking/Parking.css';
import formatDate from '../../hooks/formatDate';

function Parking() {
  const navigate = useNavigate();

  const onSearchFn = (startDate, endDate) =>
    startDate &&
    endDate &&
    navigate(`/parking/from/${formatDate(startDate)}/end/${formatDate(endDate)}`);

  return (
    <div>
      <h1 className="page-title mobile">Parking</h1>
      <h1 className="page-title desktop">Parking - Secure your Car While You&apos;re Away</h1>
      <BackGroundContext.Provider value="component-background parking-bg">
        <DatePicker
          onSearch={(startDate, endDate) => {
            onSearchFn(startDate, endDate);
          }}
        />
      </BackGroundContext.Provider>
    </div>
  );
}

export default Parking;
