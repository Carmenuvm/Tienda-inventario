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
      const response = await getProductById(id);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (updatedProduct) => {
    await updateProduct(id, updatedProduct);
    navigate('/');
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Editar Producto</h1>
      <ProductForm product={product} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditProduct;