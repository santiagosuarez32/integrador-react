import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from "./store/cartSlice";
import Navbar from "./Navbar";
import CategoryFilter from "./CategoryFilter";
import ProductList from "./ProductList";
import CartModal from "./CartModal";
import HeroSection from "./HeroSection";
import products from "../data/products";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartToast from "./AddToCartToast";

const Ecommerce = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState("");
  const categoryFilterRef = useRef(null);

  // Filtrar productos por categoría
  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter(product => product.category === selectedCategory);

  // Agregar producto al carrito
  const addProductToCart = product => {
    dispatch(addToCart(product));
    setLastAddedProduct(product.name);
    setShowToast(true);
  };

  // Navegar al checkout si hay productos en el carrito
  const handleGoToCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout");
    } else {
      alert("No puedes ir al checkout con el carrito vacío.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        onHomeClick={() => window.scrollTo(0, 0)}
        showCart={true}
      />
      <HeroSection />

      {/* Sección de productos */}
      <main className="container mx-auto p-4 flex-grow">
        <div ref={categoryFilterRef}>
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
        <ProductList products={filteredProducts} addToCart={addProductToCart} />
      </main>

      {/* Carrito Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={productId => dispatch(removeFromCart(productId))}
        total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        increaseQuantity={productId => dispatch(increaseQuantity(productId))}
        decreaseQuantity={productId => dispatch(decreaseQuantity(productId))}
        onCheckout={handleGoToCheckout}
      />

      {/* Toast de agregado al carrito */}
      <AddToCartToast
        show={showToast}
        onClose={() => setShowToast(false)}
        productName={lastAddedProduct}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p>© {new Date().getFullYear()} Mi Ecommerce. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Ecommerce;
