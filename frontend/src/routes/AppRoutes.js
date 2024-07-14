import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import UpdateZipbb from '../pages/UpdateZipbb';
import RunZipbb from '../pages/RunZipbb';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/update-zipbb" element={<UpdateZipbb />} />
      <Route path="/run-zipbb" element={<RunZipbb />} />
    </Routes>
  );
};

export default AppRoutes;
