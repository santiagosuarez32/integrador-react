import { Routes, Route } from "react-router-dom";
import Ecommerce from "./components/Ecommerce";
import CheckoutForm from "./components/CheckoutForm";
import AboutUs from "./components/about/AboutUs";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Ecommerce />} /> {/* ⬅ Página principal */}
      <Route path="/checkout" element={<CheckoutForm onConfirmPayment={() => console.log("Pago confirmado!")} />} />
      <Route path="/nosotros" element={<AboutUs />} /> {/* ⬅ Página de "Sobre Nosotros" */}
     

    </Routes>
  );
}

export default App;
