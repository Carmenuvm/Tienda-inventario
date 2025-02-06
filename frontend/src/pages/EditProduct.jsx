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
        const productData = response.data;

        // Convertir el buffer de la imagen a base64
        if (productData.imagen && productData.imagen.data) {
          const binary = new Uint8Array(productData.imagen.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          );
          productData.imagen = `data:image/jpeg;base64,${btoa(binary)}`;
        }

        setProduct(productData);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateProduct(id, formData);
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