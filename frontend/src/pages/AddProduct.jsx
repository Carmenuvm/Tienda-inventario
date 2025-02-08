// src/pages/AddProduct.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { createProduct } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = async (product) => {
    try {
      await createProduct(product);
      toast.success('Producto creado exitosamente!');
      navigate('/');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Agregar Producto</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;