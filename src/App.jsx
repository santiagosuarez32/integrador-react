import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactForm = () => {
  const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    asunto: "",
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().min(8, "Debe contener al menos 8 caracteres").required("Campo obligatorio"),
    apellido: Yup.string().min(8, "Debe contener al menos 8 caracteres").required("Campo obligatorio"),
    email: Yup.string().email("Formato de correo inválido").required("Campo obligatorio"),
    asunto: Yup.string().min(8, "Debe contener al menos 8 caracteres").required("Campo obligatorio"),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log(values)}>
      {({ errors, touched }) => (
        <Form className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Formulario de Contacto</h2>

          {["nombre", "apellido", "email", "asunto"].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-blue-700 font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <Field
                name={field}
                type={field === "email" ? "email" : "text"}
                className={`w-full p-2 rounded border ${
                  touched[field] ? (errors[field] ? "border-red-500" : "border-green-500") : "border-blue-500"
                } focus:outline-none`}
              />
              <ErrorMessage name={field} component="div" className="text-red-500 text-sm mt-1" />
            </div>
          ))}

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition">
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
