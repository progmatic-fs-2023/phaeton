import React from 'react';
import { Route, Routes } from 'react-router';
import Home from '../pages/Home';

function Layout() {
  return (
    <div>
      <Routes>
        {/* change components if ready :) 🥨 */}
        <Route path="*" element={<Home />} />
        <Route path="rental" element={<Home />} />
        <Route path="parking" element={<Home />} />
        <Route path="shuttle" element={<Home />} />
        <Route path="contact" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Layout;
