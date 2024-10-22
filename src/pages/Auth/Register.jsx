import React from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../services/api'; 
import Form from '../../components/Form/Form';

const Register = () => {
  const navigate = useNavigate();

  const formFields = [
    { name: 'username', label: 'Nombre de Usuario', type: 'text' },
    { name: 'email', label: 'Correo Electrónico', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
  ];

  const handleSubmit = async (formData) => {
    try {
      const response = await post('/auth/register', formData);
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Registro de Usuario</h1>
        <Form 
          fields={formFields}
          onSubmit={handleSubmit}
          buttonText="Registrarse"
          formClassName="space-y-4"
          inputClassName="text-lg"
          buttonClassName="bg-green-500 hover:bg-green-600 w-full py-2 px-4"
        />    
      </div>
    </div>
  );
};

export default Register;
