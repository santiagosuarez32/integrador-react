import { Routes, Route } from 'react-router-dom';
import Ecommerce from './components/Ecommerce';
import CheckoutForm from './components/CheckoutForm';
import ProductList from './components/ProductList';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Ecommerce />} />
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/productos" element={<ProductList />} />
      

    </Routes>
  );
}

export default App;