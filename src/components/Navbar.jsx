import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "./store/navbarSlice";
import { Link } from "react-router-dom";

<<<<<<< HEAD
const Navbar = () => {
  const dispatch = useDispatch();
  const { isMenuOpen, cartCount } = useSelector(state => state.navbar);
=======

const Navbar = ({ cartCount, openCart, onHomeClick, showCart = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
>>>>>>> b57d9187d27374a4f2c1448edc7f5158a76054fd

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-white">Mi Tienda Online</Link>

<<<<<<< HEAD
      <button 
        onClick={() => dispatch(toggleMenu())} 
        className="md:hidden p-2 text-white"
      >
        {isMenuOpen ? "Cerrar" : "Abrir"} Menú
      </button>
=======
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
>>>>>>> b57d9187d27374a4f2c1448edc7f5158a76054fd

      <div className="relative">
        <button className="p-2 text-white">
          🛒 {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
<<<<<<< HEAD
        </button>
=======
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
>>>>>>> b57d9187d27374a4f2c1448edc7f5158a76054fd
      </div>
    </nav>
  );
};

export default Navbar;
