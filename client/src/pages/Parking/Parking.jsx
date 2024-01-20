import { useNavigate } from 'react-router-dom';
import DatePicker from '../../components/ReusableComponents/DatePicker';
import BackGroundContext from '../../contexts/BackgroundContext';
import '../../components/styles/Parking/Parking.css';
import formatDate from '../../hooks/formatDate';

function Parking() {
  const navigate = useNavigate();

  const onSearchFn = (startDateOnSearch, endDateOnSearch) =>
    startDateOnSearch &&
    endDateOnSearch &&
    navigate(`/parking/from/${formatDate(startDateOnSearch)}/end/${formatDate(endDateOnSearch)}`);

  return (
    <div>
      <h1 className="page-title mobile">Parking</h1>
      <h1 className="page-title desktop">Parking - Secure your Car While You&apos;re Away</h1>
      <BackGroundContext.Provider value="component-background parking-bg">
        <DatePicker
          onSearch={(startDateOnSearch, endDateOnSearch) => {
            onSearchFn(startDateOnSearch, endDateOnSearch);
          }}
        />
      </BackGroundContext.Provider>
    </div>
  );
}

export default Parking;
