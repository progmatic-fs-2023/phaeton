import React from 'react';
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
import RentalPage from '../pages/RentalPage';

function Layout() {
  return (
    <div>
      <Header />
      <Routes>
        {/* change components if ready :) 🥨 */}
        <Route path="/" element={<Home />} />
        <Route path="rental" element={<Rent />} />
        <Route path="rental/from/:startDate/end/:endDate" element={<RentalPage />} />
        <Route path="rental/from/:startDate/end/:endDate" element={<RentalPage />} />
        <Route path="parking" element={<Parking />} />
        <Route path="parking/from/:startDate/end/:endDate" element={<ParkingZonesPage />} />
        <Route
          path="parking/from/:startDate/end/:endDate/zone/:zone"
          element={<Booking service="parking" />}
        />
        <Route path="shuttle" element={<Shuttle />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<h1>error 404</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Layout;
