import './App.css';
import { useEffect, useState } from 'react';
import { API_URL } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePageNav from './components/HomePageNav';

function App() {
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}`).then((response) => {
      if (response.ok) setIsConnect(true);
    });
  }, []);
  return (
    <div>
      <Header />
      <HomePageNav />
      <Footer />
      <ul>
        <li>
          {isConnect ? '✅' : '️❗️'} Connect to backend {!isConnect && 'failed'}
        </li>
      </ul>
    </div>
  );
}

export default App;
