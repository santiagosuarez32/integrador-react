import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // React Router para el botón de volver

const ContactForm = () => {
  const navigate = useNavigate();
  const [showThankYou, setShowThankYou] = useState(false);

  const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    asunto: "",
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("Debe completar el campo"),
    apellido: Yup.string().required("Debe completar el campo"),
    email: Yup.string()
      .matches(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, "Formato de correo inválido (Ej: usuario@dominio.ext)")
      .required("Campo obligatorio"),
    asunto: Yup.string().required("Debe completar el campo"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Formulario enviado:", values);
    setShowThankYou(true);
    resetForm(); // Reinicia el formulario después de enviar

    setTimeout(() => {
      setShowThankYou(false); // Oculta el mensaje de agradecimiento
      navigate("/"); // Redirige al home
    }, 3000);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, handleSubmit }) => (
        <div className="h-screen flex justify-center items-center relative">
          {/* Botón para volver al home */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Volver
          </button>

          <Form className="bg-white p-6 rounded-lg shadow-md max-w-md w-full" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">Formulario de Contacto</h2>

            {[
              { name: "nombre", label: "Nombre" },
              { name: "apellido", label: "Apellido" },
              { name: "email", label: "Email" },
              { name: "asunto", label: "Asunto" },
            ].map(({ name, label }) => (
              <div key={name} className="mb-4">
                <label htmlFor={name} className="block text-blue-700 font-medium">
                  {label}
                </label>
                <Field
                  name={name}
                  type={name === "email" ? "text" : "text"}
                  className={`w-full p-2 rounded-lg border ${
                    touched[name] ? (errors[name] ? "border-red-500" : "border-green-500") : "border-blue-500"
                  } focus:outline-none`}
                />
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
              </div>
            ))}

            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition">
              Enviar
            </button>
          </Form>

          {/* Mensaje de agradecimiento y redirección */}
          {showThankYou && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 text-center">
                <h3 className="text-xl font-bold mb-4">¡Gracias por tu mensaje!</h3>
                <p className="mb-4">Redirigiendo al home...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default ContactForm;
