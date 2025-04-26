import { Routes, Route } from 'react-router-dom';
import Ecommerce from './components/Ecommerce';
import CheckoutForm from './components/CheckoutForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Ecommerce />} />
      <Route path="/checkout" element={<CheckoutForm />} />
      {/* Otras rutas si las tienes */}
    </Routes>
  );
}

export default App;