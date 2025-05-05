import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Ecommerce from './components/Ecommerce';
import './index.css';
import ProductList from './components/ProductList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/productos" element={<ProductList />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes> 
    </Router>
  </React.StrictMode>
);