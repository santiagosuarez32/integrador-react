import React from 'react';

const CartModal = ({ 
  isOpen, 
  onClose, 
  cart, 
  total,
  onCheckout,
  increaseQuantity,
  decreaseQuantity
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
      <div className="bg-white p-4 rounded-lg w-full max-w-xs md:max-w-sm max-h-[80vh] flex flex-col">
        {/* Encabezado compacto */}
        <div className="flex justify-between items-center mb-3 sticky top-0 bg-white pb-3 border-b">
          <h2 className="text-lg font-semibold">Tu Carrito</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✖
          </button>
        </div>

        {/* Lista de productos compacta */}
        <div className="overflow-y-auto flex-grow">
          {cart.length === 0 ? (
            <p className="text-center py-8 text-sm">El carrito está vacío</p>
          ) : (
            <div className="divide-y">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  {/* Imagen más pequeña */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-10 h-10 object-cover rounded"
                  />

                  {/* Nombre del producto con texto más compacto */}
                  <span className="flex-grow ml-3 text-sm font-medium truncate max-w-[100px]">
                    {item.name}
                  </span>

                  {/* Controles de cantidad compactos */}
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300 text-xs"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => increaseQuantity(item.id)}
                      className="w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300 text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Precio compacto */}
                  <p className="ml-3 text-sm font-medium">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección de total compacta */}
        {cart.length > 0 && (
          <div className="sticky bottom-0 bg-white pt-3 border-t">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-sm">Total:</span>
              <span className="text-lg font-bold">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-green-600 text-white py-2 text-sm rounded hover:bg-green-700"
            >
              Proceder al pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
