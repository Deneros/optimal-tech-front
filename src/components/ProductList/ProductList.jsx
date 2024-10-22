import React from 'react';
import Button from '../Button/Button';

const ProductList = ({ products, handleEdit, handleDelete }) => {
  return (
    <ul className="space-y-2">
      {products.map((product, index) => (
        <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
          <span>{product}</span>
          <div className="space-x-2">
            <Button onClick={() => handleEdit(index)} className="bg-green-500 hover:bg-green-600">Editar</Button>
            <Button onClick={() => handleDelete(index)} className="bg-red-500 hover:bg-red-600">Eliminar</Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
