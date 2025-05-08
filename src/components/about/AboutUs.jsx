import React from "react";
import { useNavigate } from "react-router-dom"; // ⬅ Importamos useNavigate

const AboutUs = () => {
  const navigate = useNavigate(); // ⬅ Instancia de navegación

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center px-6 py-12">
      {/* Botón de volver */}
      <div className="w-full max-w-5xl flex justify-start">
        <button
          onClick={() => navigate("/")} // ⬅ Redirige al home
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold shadow-md hover:bg-gray-200 transition"
        >
          ← Volver
        </button>
      </div>

      {/* Sección principal */}
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center mt-4">
        {/* Texto */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Sobre Nosotros</h1>
          <h2 className="text-lg font-semibold text-gray-600 mb-2 tracking-wide">
            Comprometidos con la excelencia
          </h2>
          <p className="text-gray-700 leading-relaxed">
            En nuestra empresa, trabajamos con pasión para ofrecer productos y servicios 
            de la más alta calidad. Nos enfocamos en la innovación, el compromiso y la 
            satisfacción de nuestros clientes. Buscamos superar expectativas y crear 
            soluciones que realmente marquen la diferencia.
          </p>
        </div>

        {/* Imagen */}
        <div className="flex-1 mt-6 md:mt-0 md:ml-6">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Equipo de trabajo"
            className="w-full rounded-xl shadow-lg transition-transform transform hover:scale-105"
          />
        </div>
      </div>

      {/* Sección adicional */}
      <div className="max-w-4xl w-full mt-12 bg-white shadow-lg rounded-xl p-8 text-center">
        <h3 className="text-3xl font-bold text-gray-800">Nuestra Visión</h3>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Creemos en el poder del esfuerzo y la creatividad para generar impacto en la comunidad.  
          Nos guiamos por nuestros valores de **transparencia, innovación y crecimiento sostenible**.  
        </p>
      </div>

      {/* Bloque de beneficios */}
      <div className="max-w-5xl w-full mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105">
          <h4 className="text-xl font-semibold text-gray-800">🔍 Transparencia</h4>
          <p className="text-gray-600 mt-2">Construimos relaciones basadas en la confianza y claridad.</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105">
          <h4 className="text-xl font-semibold text-gray-800">🚀 Innovación</h4>
          <p className="text-gray-600 mt-2">Siempre buscamos nuevas soluciones para mejorar tu experiencia.</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105">
          <h4 className="text-xl font-semibold text-gray-800">🌱 Crecimiento</h4>
          <p className="text-gray-600 mt-2">Nos enfocamos en el desarrollo sostenible y positivo.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
