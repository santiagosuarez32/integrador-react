import { useState, useRef } from "react";
import products from "../data/products";
import Navbar from "./Navbar";
import CategoryFilter from "./CategoryFilter";
import ProductList from "./ProductList";
import CartModal from "./CartModal";
import AddToCartToast from "./AddToCartToast";
import CheckoutForm from "./CheckoutForm";
import HeroSection from "./HeroSection";

const Ecommerce = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState("");

  const categoryFilterRef = useRef(null); // 🔗 Nueva referencia para CategoryFilter

  const filteredProducts = selectedCategory === "todos" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setLastAddedProduct(product.name);
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        onHomeClick={() => window.scrollTo(0, 0)}
        showCart={!isCheckingOut}
      />

      <HeroSection scrollToCategory={() => categoryFilterRef.current.scrollIntoView({ behavior: "smooth" })} />

      <main className="container mx-auto p-4">
        {isCheckingOut ? (
          <CheckoutForm 
            cart={cart}
            total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
            onConfirmPayment={() => {
              setCart([]);
              setIsCheckingOut(false);
              setIsCartOpen(false);
            }}
            onCancel={() => setIsCheckingOut(false)}
          />
        ) : (
          <>
            <div ref={categoryFilterRef}>  {/* 📌 Referencia para desplazamiento */}
              <CategoryFilter 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            <ProductList 
              products={filteredProducts} 
              addToCart={addToCart} 
            />
          </>
        )}
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={(productId) => setCart(cart.filter(item => item.id !== productId))}
        total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
        onCheckout={() => {
          setIsCheckingOut(true);
          setIsCartOpen(false);
        }}
      />

      <AddToCartToast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        productName={lastAddedProduct} 
      />
    </div>
  );
};

export default Ecommerce;
