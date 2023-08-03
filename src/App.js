import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DevicesList from './components/DevicesList/DevicesList';
import AddEditDevice from './components/AddEditDevice/AddEditDevice';
import Header from './components/Header/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
         <Route path="/" element={<DevicesList />} />
          <Route path="/add" element={<AddEditDevice />} />
          <Route path="/edit/:deviceId" element={<AddEditDevice />}  />
      </Routes>
    </Router>
  );
};

export default App;
