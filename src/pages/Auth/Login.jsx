import React from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../services/api';
import Form from '../../components/Form/Form';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const fields = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Ingresa tu usuario',
      label: 'Usuario',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Ingresa tu contraseña',
      label: 'Contraseña',
      required: true,
    },
  ];


  const handleSubmit = async (formData) => {
    try {
      const response = await post('/auth/login', formData);
      const { token } = response;
      onLogin(token);
      navigate('/home'); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <Form fields={fields} onSubmit={handleSubmit} buttonText="Iniciar Sesión" />
      </div>
    </div>
  );
};

export default Login;
