import DatePicker from '../components/DatePicker';
import BackGroundContext from '../contexts/BackgroundContext';

function Parking() {
  let startDate;
  let endDate;

  function getStartDate(data) {
    startDate = data;
    console.log(startDate);
  }

  function getEndDate(data) {
    endDate = data;
    console.log(endDate);
  }

  return (
    <div>
      <BackGroundContext.Provider value={'parking-bg'}>
      <DatePicker getStartDate={getStartDate} getEndDate={getEndDate} />
      </BackGroundContext.Provider>
    </div>
  );
}

export default Parking;
