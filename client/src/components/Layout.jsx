import React, { useState, useMemo, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Header from './Header-Footer/Header';
import Footer from './Header-Footer/Footer';
import Rent from '../pages/Rent/Rent';
import Parking from '../pages/Parking/Parking';
import Shuttle from '../pages/Shuttle';
import Booking from '../pages/Booking';
import ParkingZonesPage from '../pages/Parking/ParkingZonesPage';
import RentalPage from '../pages/Rent/RentalPage';
import CarContext from '../contexts/CarContext';
import PageNotFound from '../pages/PageNotFound';
import ParkingDetailsContext from '../contexts/ParkingDetailsContext';
import Profile from '../pages/Settings/Profile';
import CarServices from '../pages/Settings/CarServices';
import SettingsLayout from './SettingsLayout';
import ParkingServices from '../pages/Settings/ParkingServices';
import ServiceFormForParking from '../pages/Parking/ServiceFormForParking';
import ServiceFormForRent from '../pages/Rent/ServiceFormForRent';
import AdminPage from '../pages/AdminPage';

function Layout() {
  const [parkingData, setParkingData] = useState(null);
  const parkingDetailsContextValue = useMemo(
    () => ({ parkingData, setParkingData }),
    [parkingData, setParkingData],
  );
  const [carData, setCarData] = useState(null);
  const CarContextValue = useMemo(() => ({ carData, setCarData }), [carData, setCarData]);

  // Get the current location.
  const { pathname } = useLocation();

  // Scroll to top if path changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Header />
      <ParkingDetailsContext.Provider value={parkingDetailsContextValue}>
        <CarContext.Provider value={CarContextValue}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<SettingsLayout />} path="/settings">
              <Route path="profile" element={<Profile />} />
              <Route path="rentservices" element={<CarServices />} />
              <Route path="parkingservices" element={<ParkingServices />} />
            </Route>
            <Route path="shuttle" element={<Shuttle />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
            {/* Rent */}
            <Route path="rental" element={<Rent />} />
            <Route path="rental/from/:startDate/end/:endDate/:category" element={<RentalPage />} />
            <Route path="rental/from/:startDate/end/:endDate" element={<RentalPage />} />
            <Route
              element={<Booking service="rental" />}
              path="rental/from/:startDate/end/:endDate/carId/:carId"
            />
            <Route
              element={<ServiceFormForRent />}
              path="rental/from/:startDate/end/:endDate/carId/:carId/form"
            />
            {/* Parking */}
            <Route path="parking" element={<Parking />} />
            <Route path="parking/from/:startDate/end/:endDate" element={<ParkingZonesPage />} />
            <Route
              path="parking/from/:startDate/end/:endDate/zone/:zone/spots/:spots"
              element={<Booking service="parking" />}
            />
            <Route
              path="parking/from/:startDate/end/:endDate/zone/:zone/spots/:spots/form"
              element={<ServiceFormForParking />}
            />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </CarContext.Provider>
      </ParkingDetailsContext.Provider>
      <Footer />
    </div>
  );
}

export default Layout;
