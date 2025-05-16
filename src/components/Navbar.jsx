import { Link } from 'react-router-dom';
import { useState } from 'react';


const Navbar = ({ cartCount, openCart, onHomeClick, showCart = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo a la izquierda */}
        <Link 
          to="/" 
          onClick={onHomeClick}
          className="text-2xl font-bold hover:text-blue-200 transition-colors cursor-pointer"
        >
          Mi Tienda Online
        </Link>

        {/* Menú para desktop (centrado) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-6 list-none p-0 m-0">
            <li>
              <Link 
                to="/" 
                className="hover:text-blue-200 transition-colors"
                onClick={onHomeClick}
              >
                Home
              </Link>
            </li>
            
            <li>
              <Link 
                to="/nosotros" 
                className="hover:text-blue-200 transition-colors"
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link 
                to="/contacto" 
                className="hover:text-blue-200 transition-colors"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Contenedor para carrito y menú hamburguesa */}
        <div className="flex items-center space-x-4">
          {/* Menú hamburguesa para móvil */}
          <button 
            className="md:hidden p-2 text-white hover:text-blue-200 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú de navegación"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>

          {/* Carrito */}
          {showCart && (
            <div className="relative">
              <button 
                onClick={openCart}
                className="p-2 text-white hover:text-blue-200 transition-colors"
                aria-label="Carrito de compras"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Menú desplegable para móvil */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-600 shadow-lg">
            <ul className="flex flex-col space-y-2 p-4 list-none">
              <li>
                <Link 
                  to="/" 
                  className="block py-2 px-4 hover:text-blue-200 transition-colors"
                  onClick={() => {
                    onHomeClick();
                    setIsMenuOpen(false);
                  }}
                >
                  Home
                </Link>
              </li>
            
              <li>
                <Link 
                  to="/nosotros" 
                  className="block py-2 px-4 hover:text-blue-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;