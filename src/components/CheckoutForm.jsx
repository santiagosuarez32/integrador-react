import { useFormik } from 'formik';
import { useState, useRef, useEffect } from 'react';

const CheckoutForm = ({ cart, total, onConfirmPayment, onCancel }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const modalRef = useRef();

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
      setShowConfirmation(true);
    }
  });

  const handleFinalConfirmation = () => {
    onConfirmPayment();
    setShowConfirmation(false);
  };

  // Función para estilos del input
  const getInputStyle = (fieldName) => {
    const hasValue = formik.values[fieldName];
    const isTouched = formik.touched[fieldName];
    const hasError = formik.errors[fieldName];

    let style = 'w-full p-2 border rounded focus:ring-1 focus:outline-none transition-colors';

    if ((!hasValue || hasError) && isTouched) {
      style += ' border-red-500 focus:border-red-500 focus:ring-red-500';
    } 
    else if (hasValue && !hasError && isTouched) {
      style += ' border-green-500 focus:border-green-500 focus:ring-green-500';
    }
    else {
      style += ' border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    }

    return style;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg my-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Finalizar Compra</h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block mb-1 text-gray-700">Nombre</label>
            <input
              name="nombre"
              type="text"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={getInputStyle('nombre')}
              required
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.nombre}</p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label className="block mb-1 text-gray-700">Apellido</label>
            <input
              name="apellido"
              type="text"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={getInputStyle('apellido')}
              required
            />
            {formik.touched.apellido && formik.errors.apellido && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.apellido}</p>
            )}
          </div>

          {/* Correo */}
          <div>
            <label className="block mb-1 text-gray-700">Correo Electrónico</label>
            <input
              name="correo"
              type="email"
              value={formik.values.correo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={getInputStyle('correo')}
              required
            />
            {formik.touched.correo && formik.errors.correo && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.correo}</p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onCancel}
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
          <div 
            ref={modalRef}
            className="bg-white p-6 rounded-lg max-w-sm w-full mx-4"
          >
            <h3 className="text-xl font-bold mb-4">Confirmar Compra</h3>
            <p className="mb-2">Total: <span className="font-semibold">${total.toFixed(2)}</span></p>
            <p className="mb-6">¿Estás seguro que deseas completar la compra?</p>
            
            <div className="flex justify-end space-x-3">
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
    </div>
  );
};

export default CheckoutForm;