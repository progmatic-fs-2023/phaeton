import React, { useState, useMemo } from 'react';
import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Header from './Header';
import Footer from './Footer';
import Rent from '../pages/Rent';
import Parking from '../pages/Parking';
import Shuttle from '../pages/Shuttle';
import Profile from '../pages/ProfilePage';
import Booking from '../pages/Booking';
import ParkingZonesPage from '../pages/ParkingZonesPage';
import ServiceForm from '../pages/ServiceForm';
import ParkingDetailsContext from '../contexts/ParkingDetailsContext';

function Layout() {
  const [parkingData, setParkingData] = useState(null);
  const parkingDetailsContextValue = useMemo(
    () => ({ parkingData, setParkingData }),
    [parkingData, setParkingData],
  );

  return (
    <div>
      <Header />
      <ParkingDetailsContext.Provider value={parkingDetailsContextValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="rental" element={<Rent />} />
          <Route path="rental/:startDate/:endDate" element={<Booking />} />
          <Route path="parking" element={<Parking />} />

          <Route path="parking/from/:startDate/end/:endDate" element={<ParkingZonesPage />} />
          <Route
            path="parking/from/:startDate/end/:endDate/zone/:zone/parkings/:parkings"
            element={<Booking service="parking" />}
          />
          <Route
            path="parking/from/:startDate/end/:endDate/zone/:zone/parkings/:parkings/form"
            element={<ServiceForm />}
          />

          <Route path="shuttle" element={<Shuttle />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<h1>error 404</h1>} />
        </Routes>
      </ParkingDetailsContext.Provider>

      <Footer />
    </div>
  );
}

export default Layout;
