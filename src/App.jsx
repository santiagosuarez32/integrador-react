import { Routes, Route } from "react-router-dom";
import Ecommerce from "./components/Ecommerce";
import CheckoutForm from "./components/CheckoutForm";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Ecommerce />} /> {/* ⬅ Página principal */}
      <Route path="/checkout" element={<CheckoutForm onConfirmPayment={() => console.log("Pago confirmado!")} />} />
     

    </Routes>
  );
}

export default App;
