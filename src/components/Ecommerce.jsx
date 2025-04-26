import { useState } from "react";
import products from "../data/products";
import Navbar from "./Navbar";
import CategoryFilter from "./CategoryFilter";
import ProductList from "./ProductList";
import CartModal from "./CartModal";
import AddToCartToast from "./AddToCartToast";
import CheckoutForm from "./CheckoutForm";

const Ecommerce = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState("");

  const filteredProducts = selectedCategory === "todos" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Función modificada para agrupar productos por id
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

  // Función para aumentar cantidad
  const increaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Función para disminuir cantidad (no baja de 1)
  const decreaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { 
              ...item, 
              quantity: item.quantity > 1 ? item.quantity - 1 : 1 
            }
          : item
      )
    );
  };

  // Función para eliminar producto completamente
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Calcula el total considerando las cantidades
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleConfirmPayment = () => {
    setCart([]);
    setIsCheckingOut(false);
    setIsCartOpen(false);
  };

  const resetToHome = () => {
    setCart([]);
    setIsCartOpen(false);
    setIsCheckingOut(false);
    setSelectedCategory("todos");
    setShowToast(false);
    window.scrollTo(0, 0);
  };

  // Calcula la cantidad total de items para el badge del carrito
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        cartCount={cartItemsCount}  // Ahora usa la cantidad total de items
        openCart={() => setIsCartOpen(true)}
        onHomeClick={resetToHome}
      />
      
      <main className="container mx-auto p-4">
        {isCheckingOut ? (
          <CheckoutForm 
            cart={cart}
            total={total}
            onConfirmPayment={handleConfirmPayment}
            onCancel={() => setIsCheckingOut(false)}
          />
        ) : (
          <>
            <CategoryFilter 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
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
        removeFromCart={removeFromCart}
        total={total}
        onCheckout={() => {
          setIsCheckingOut(true);
          setIsCartOpen(false);
        }}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
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