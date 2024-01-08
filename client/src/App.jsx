import './App.css';
import { useEffect, useState, useMemo } from 'react';
import { API_URL } from './constants';
import Layout from './components/Layout';
import UserContext from './contexts/UserContext';

function App() {
  const [isConnect, setIsConnect] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}`).then((response) => {
      if (response.ok) setIsConnect(true);
    });
  }, []);

  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={userContextValue}>
      <div>
        <Layout />
        <ul>
          <li>
            {isConnect ? '✅' : '️❗️'} Connect to backend {!isConnect && 'failed'}
          </li>
        </ul>
      </div>
    </UserContext.Provider>
  );
}

export default App;
