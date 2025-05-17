import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./components/store/store";
import Ecommerce from "./components/Ecommerce";
import CheckoutForm from "./components/CheckoutForm";
import AboutUs from "./components/about/AboutUs";
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Ecommerce />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/contacto" element={<ContactForm />} />
      </Routes>
    </Provider>
  );
}

export default App;
