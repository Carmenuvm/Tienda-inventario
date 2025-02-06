// src/pages/EditProduct.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { getProductById, updateProduct } from '../services/api';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (updatedProduct) => {
    try {
      await updateProduct(id, updatedProduct);
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Editar Producto</h1>
      <ProductForm onSubmit={handleSubmit} initialData={product} />
    </div>
  );
};

export default EditProduct;