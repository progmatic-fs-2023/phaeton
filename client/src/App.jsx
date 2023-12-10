import './App.css';
import { useEffect, useState } from 'react';
import { API_URL } from './constants';
import Footer from './components/Footer.jsx';
function App() {
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}`).then((response) => {
      if (response.ok) setIsConnect(true);
    });
  }, []);

  useEffect(() => {
    console.log(isConnect);
  }, []);

  return (
    <div>
      Hello project!
      <ul>
        <li>
          {isConnect ? '✅' : '️❗️'} Connect to backend {!isConnect && 'failed'}
        </li>
      </ul>
      <Footer />
    </div>
  );
}

export default App;
