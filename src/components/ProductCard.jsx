const ProductCard = ({ product, addToCart }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductCard;