import React, { useEffect, useState, useMemo } from 'react';
import { get, post, remove, put } from '../../services/api';
import Form from '../../components/Form/Form';
import Table from '../../components/Table/Table';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    try {
      const data = await get('/api/v1/products', token);
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const handleProductSubmit = async (formData, resetForm) => {
    const token = localStorage.getItem('token');
    try {
      if (isEditing && selectedProduct) {
        await put(`/api/v1/products/${selectedProduct.id}`, formData, token);
        setIsEditing(false); 
        setSelectedProduct(null);
      } else {
        await post('/api/v1/products', formData, token); 
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error al crear o actualizar producto:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await remove(`/api/v1/products/${productId}`, token); 
      fetchProducts();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const productColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Precio', accessor: 'price' },
    { header: 'Stock', accessor: 'stock' },
    { header: 'Stock Mínimo', accessor: 'stockMinimum' },
    { 
      header: 'Acciones', 
      accessor: 'actions',
      render: (rowData) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => handleEdit(rowData)} 
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          >
            Editar
          </button>
          <button 
            onClick={() => handleDelete(rowData.id)} 
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      )
    }
  ];

  const initialValues = useMemo(() => ({
    name: selectedProduct?.name || '',
    price: selectedProduct?.price || '',
    stock: selectedProduct?.stock || '',
    stockMinimum: selectedProduct?.stockMinimum || '',
  }), [selectedProduct]);

  const productFields = useMemo(() => [
    { name: 'name', label: 'Nombre del Producto', type: 'text' },
    { name: 'price', label: 'Precio', type: 'number' },
    { name: 'stock', label: 'Stock', type: 'number' },
    { name: 'stockMinimum', label: 'Stock Mínimo', type: 'number' },
  ], []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      <div className="flex flex-row gap-8">
        <div className="w-1/2">
          <section className="mb-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">{isEditing ? 'Editar Producto' : 'Insertar Producto'}</h2>
            <Form 
              fields={productFields}
              initialValues={initialValues}
              selectedProduct={selectedProduct}
              onSubmit={handleProductSubmit} 
              buttonText={isEditing ? 'Actualizar Producto' : 'Agregar Producto'} 
            />
          </section>
        </div>

        <div className="w-1/2">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Lista de Productos</h2>
            <Table columns={productColumns} data={products} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
