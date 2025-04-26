import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Ecommerce from './components/Ecommerce';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        {/* Otras rutas si las necesitas */}
      </Routes>
    </Router>
  </React.StrictMode>
);