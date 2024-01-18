import './App.css';
import { useEffect, useState, useMemo } from 'react';
import Layout from './components/Layout';
import UserContext from './contexts/UserContext';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:3000/users/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${  token}`,
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => 
        response.json()
      )
      .then((data) => {
        setUser(data);
        setIsLoading(false)
      })
      .catch(() => {
        throw new Error('Network response was not ok');
      })  }, []);


  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);
if(isLoading) {
  return <LoadingScreen />
} 
  return (
    <UserContext.Provider value={userContextValue}>
      <div>
        <Layout />
      </div>
    </UserContext.Provider>
  );
}

export default App;
