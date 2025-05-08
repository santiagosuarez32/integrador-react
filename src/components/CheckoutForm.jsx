import { useFormik } from 'formik';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ onConfirmPayment }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const modalRef = useRef();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      correo: ''
    },
    validate: values => {
      const errors = {};
      if (!values.nombre || values.nombre.length < 5) {
        errors.nombre = 'Mínimo 5 caracteres';
      }
      if (!values.apellido || values.apellido.length < 5) {
        errors.apellido = 'Mínimo 5 caracteres';
      }
      if (!values.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo) || values.correo.length < 8) {
        errors.correo = 'Debe incluir @ y tener mínimo 8 caracteres';
      }
      return errors;
    },
    onSubmit: () => {
      setShowConfirmation(true); // ⬅ Muestra el modal de confirmación al enviar el formulario
    }
  });

  const handleFinalConfirmation = () => {
    console.log("Compra confirmada");

    if (typeof onConfirmPayment === "function") {
      onConfirmPayment();
    } else {
      console.error("onConfirmPayment no está definido correctamente.");
    }

    setShowConfirmation(false);
    setShowThankYou(true);

    setTimeout(() => {
      console.log("Redirigiendo a la tienda...");
      setShowThankYou(false);
      navigate("/");
    }, 2000);
  };

  // 🔹 Función para determinar el color del borde del input
  const getInputStyle = (fieldName) => {
    const isTouched = formik.touched[fieldName];
    const hasError = formik.errors[fieldName];

    let style = "w-full p-2 border rounded transition-colors";

    if (hasError && isTouched) {
      style += " border-red-700"; // 🔴 Bordes rojos si hay error
    } else if (!hasError && isTouched) {
      style += " border-green-700"; // 🟢 Bordes verdes si está correcto
    } else {
      style += " border-black"; // ⬛ Bordes negros por defecto
    }

    return style;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg my-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Finalizar Compra</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Nombre</label>
            <input 
              name="nombre"
              type="text"
              {...formik.getFieldProps("nombre")}
              onBlur={formik.handleBlur} // ⬅ Asegura que se registre `touched`
              className={getInputStyle("nombre")}
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <p className="text-red-700 text-sm mt-1">{formik.errors.nombre}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Apellido</label>
            <input 
              name="apellido"
              type="text"
              {...formik.getFieldProps("apellido")}
              onBlur={formik.handleBlur} // ⬅ Asegura que se registre `touched`
              className={getInputStyle("apellido")}
            />
            {formik.touched.apellido && formik.errors.apellido && (
              <p className="text-red-700 text-sm mt-1">{formik.errors.apellido}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Correo Electrónico</label>
            <input 
              name="correo"
              type="email"
              {...formik.getFieldProps("correo")}
              onBlur={formik.handleBlur} // ⬅ Asegura que se registre `touched`
              className={getInputStyle("correo")}
            />
            {formik.touched.correo && formik.errors.correo && (
              <p className="text-red-700 text-sm mt-1">{formik.errors.correo}</p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button 
              type="button" 
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Volver
            </button>
            <button 
              type="submit" 
              disabled={!formik.isValid} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              Confirmar Compra
            </button>
          </div>
        </form>
      </div>

      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 text-center">
            <h3 className="text-xl font-bold mb-4">Confirmar Compra</h3>
            <p className="mb-6">¿Estás seguro que deseas completar la compra?</p>
            
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleFinalConfirmation}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de agradecimiento */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 text-center">
            <h3 className="text-xl font-bold mb-4">¡Gracias por tu compra!</h3>
            <p className="mb-4">Redirigiendo al home...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
