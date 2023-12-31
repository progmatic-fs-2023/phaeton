import './App.css';
import { useEffect, useState } from 'react';
import { API_URL } from './constants';
import Layout from './components/Layout';

function App() {
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}`).then((response) => {
      if (response.ok) setIsConnect(true);
    });
  }, []);
  return (
    <div>
      <Layout />
      <ul>
        <li>
          {isConnect ? '✅' : '️❗️'} Connect to backend {!isConnect && 'failed'}
        </li>
      </ul>
    </div>
  );
}

export default App;
