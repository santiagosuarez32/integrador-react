import React from 'react';

const CartModal = ({ 
  isOpen, 
  onClose, 
  cart, 
  removeFromCart, 
  total,
  onCheckout,
  increaseQuantity,
  decreaseQuantity
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-4">
          <h2 className="text-2xl font-bold">Tu Carrito</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ✖
          </button>
        </div>
        
        {/* Lista de productos */}
        <div className="overflow-y-auto flex-grow">
          {cart.length === 0 ? (
            <p className="text-center py-8">El carrito está vacío</p>
          ) : (
            <div className="divide-y">
              {cart.map((item) => (
                <div key={`${item.id}-${cart.indexOf(item)}`} className="py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 flex-grow">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-gray-600">${item.price.toFixed(2)} c/u</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="ml-4 text-right w-20">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700 p-2"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total y botones */}
        {cart.length > 0 && (
          <div className="sticky bottom-0 bg-white pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Proceder al pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Asegúrate de tener esta línea de exportación
export default CartModal;