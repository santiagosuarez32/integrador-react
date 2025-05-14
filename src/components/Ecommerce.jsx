import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import Navbar from "./Navbar";
import CategoryFilter from "./CategoryFilter";
import ProductList from "./ProductList";
import CartModal from "./CartModal";
import AddToCartToast from "./AddToCartToast";
import HeroSection from "./HeroSection";

const Ecommerce = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState("");
  const categoryFilterRef = useRef(null);
  const navigate = useNavigate();

  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const scrollToProducts = () => {
    categoryFilterRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Estado y lógica del carrusel
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 > products.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 3 : prevIndex - 1
    );
  };

  // Funciones del carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setLastAddedProduct(product.name);
    setShowToast(true);
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleGoToCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout");
    } else {
      alert("No puedes ir al checkout con el carrito vacío.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        onHomeClick={() => window.scrollTo(0, 0)}
        showCart={true}
      />
      <HeroSection scrollToCategory={scrollToProducts} />

      {/* Carrusel sin animación */}
      <div className="relative max-w-4xl mx-auto mt-12 p-6 bg-blue-600 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <button
            onClick={prevSlide}
            className="bg-gray-300 p-2 rounded-full hover:bg-gray-400"
          >
            ◀
          </button>
          <div className="flex space-x-4 justify-center items-center overflow-hidden">
            {products.slice(currentIndex, currentIndex + 3).map((product) => (
              <div key={product.id} className="flex flex-col items-center text-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded-lg shadow-md"
                />
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-200">{product.price} USD</p>
              </div>
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="bg-gray-300 p-2 rounded-full hover:bg-gray-400"
          >
            ▶
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={scrollToProducts}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Ir a Productos
          </button>
        </div>
      </div>

      <main className="container mx-auto p-4 flex-grow">
        <div ref={categoryFilterRef}>
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <ProductList products={filteredProducts} addToCart={addToCart} />
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        onCheckout={handleGoToCheckout}
      />

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
