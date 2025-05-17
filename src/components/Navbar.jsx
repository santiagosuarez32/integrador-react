import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "./store/navbarSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isMenuOpen, cartCount } = useSelector(state => state.navbar);

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-white">Mi Tienda Online</Link>

      <button 
        onClick={() => dispatch(toggleMenu())} 
        className="md:hidden p-2 text-white"
      >
        {isMenuOpen ? "Cerrar" : "Abrir"} Menú
      </button>

      <div className="relative">
        <button className="p-2 text-white">
          🛒 {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
