import React from 'react';
import { Link } from 'react-router-dom';
import './../Hero.css'; // Archivo CSS para estilos personalizados

const HeroSection = ({ scrollToCategory }) => { // ⬅ Cambio de nombre de prop
  return (
    <section className="hero h-screen w-full flex items-center justify-center relative overflow-hidden z-10">
      {/* Fondo animado */}
      <div className="hero-bg absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-800 opacity-90"></div>
      
      {/* Contenido */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Título principal con animación */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeIn">
            Bienvenido a <span className="text-yellow-300">Mi Tienda</span>
          </h1>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fadeIn delay-100">
            Descubre los mejores productos con envío rápido y garantía de calidad
          </p>
          
          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn delay-200">
            <button 
              onClick={scrollToCategory} // ⬅ Cambio de función de scroll
              className="btn-primary px-8 py-3 rounded-full font-semibold text-lg transition-all hover:scale-105"
            >
              Ver Productos
            </button>
            <Link 
             
              className="btn-secondary px-8 py-3 rounded-full font-semibold text-lg transition-all hover:scale-105"
            >
              Ofertas Especiales
            </Link>
          </div>
        </div>
      </div>

      {/* Elemento decorativo animado */}
      <div className="hero-decoration absolute bottom-0 left-0 w-full h-20 bg-white transform skew-y-2 origin-bottom-left"></div>
    </section>
  );
};

export default HeroSection;
