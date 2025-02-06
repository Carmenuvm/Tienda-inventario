// src/pages/AddProduct.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { createProduct } from '../services/api';

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = async (product) => {
    await createProduct(product);
    navigate('/');
  };

  return (
    <div>
      <h1>Agregar Producto</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;