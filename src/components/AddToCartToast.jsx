import { useEffect, useState } from 'react';

const AddToCartToast = ({ show, onClose, productName }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (show) {
      setIsExiting(false);
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onClose, 300); // Tiempo para completar la animación de salida
      }, 1000); // Duración total: 1 segundo (1000ms)

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${
      isExiting ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'
    }`}>
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
        <span>{productName} agregado al carrito con éxito!</span>
      </div>
    </div>
  );
};

export default AddToCartToast;