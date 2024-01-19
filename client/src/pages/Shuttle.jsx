import shuttlePic from '../assets/shuttle/shuttlepic.jpg';
import '../components/styles/Pages/shuttle.css';
import useDocumentTitle from '../components/useDocumentTitle';

export const phoneNumber = '+1234567890';

function Shuttle() {
  useDocumentTitle('Phaeton · Shuttle');

  return (
    <div className="shuttle-container">
      <img className="shuttle-pic" src={shuttlePic} alt="shuttlepic" />
      <div className="shuttle-information-container">
        <h2 className="shuttle-title">Information about the Airport Shuttle</h2>
        <p>
          It is a convenient, cost-effective and fast connection between the airport and our
          Headquarters. The bus service operates around the clock, seven days a week:
        </p>
        <ul className="shuttle-list">
          <li className="shuttle-list-elem">
            every 20 minutes on Mondays and Fridays, during the day
          </li>
          <li className="shuttle-list-elem">
            every 30 minutes on Tuesdays, Wednesdays, Thursdays, Saturdays and Sundays, during the
            day
          </li>
          <li className="shuttle-list-elem">
            every 45 minutes in the mornings, evenings and at night
          </li>
        </ul>
        <p>
          For further information contact our Call Centre available 0-24 by dialing{' '}
          <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        </p>
      </div>
    </div>
  );
}

export default Shuttle;
