import React, { useState, useEffect } from 'react';

const Form = ({ fields, initialValues = {}, selectedProduct, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState(() => {
    const initialFormData = {};
    fields.forEach(field => {
      initialFormData[field.name] = initialValues[field.name] || '';
    });
    return initialFormData;
  });

  useEffect(() => {
    // Solo actualiza formData cuando el ID del producto seleccionado cambia
    const updatedFormData = {};
    fields.forEach(field => {
      updatedFormData[field.name] = initialValues[field.name] || '';
    });
    setFormData(updatedFormData);
  }, [selectedProduct?.id]); // Dependencia en el ID del producto seleccionado

  const handleChange = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, () => {
      // Opcional: resetear el formulario después de enviar
      setFormData({});
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
