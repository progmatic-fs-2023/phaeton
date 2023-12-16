import React from 'react';
import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Header from './Header';
import Footer from './Footer';
import Rent from '../pages/Rent';
import Parking from '../pages/Parking';
import Shuttle from '../pages/Shuttle';


function Layout() {
  return (
    <div>
      <Header />
      <Routes>
        {/* change components if ready :) 🥨 */}
        <Route path="*" element={<Home />} />
        <Route path="rental" element={<Rent />} />
        <Route path="parking" element={<Parking />} />
        <Route path="shuttle" element={<Shuttle />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Layout;
