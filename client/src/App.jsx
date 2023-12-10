import './App.css';
import { useEffect, useState } from 'react';
import { API_URL } from './constants';
import Login from './components/Login';

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
      <Login />
      <ul>
        <li>
          {isConnect ? '✅' : '️❗️'} Connect to backend {!isConnect && 'failed'}
        </li>
      </ul>
    </div>
  );
}

export default App;
