import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Ecommerce from "./components/Ecommerce";
import CheckoutForm from "./components/CheckoutForm";
import AboutUs from "./components/about/AboutUs";
import ContactForm from "./components/ContactForm";

function App() {
  const [cart, setCart] = useState([]); // 🛒 Estado global del carrito

  return (
    <Routes>
      <Route path="/" element={<Ecommerce cart={cart} setCart={setCart} />} />
      <Route path="/checkout" element={<CheckoutForm cart={cart} />} />
      <Route path="/nosotros" element={<AboutUs />} />
      <Route path="/contacto" element={<ContactForm />} />
    </Routes>
  );
}

export default App;
