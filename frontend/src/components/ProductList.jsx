// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Inventario de Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <img src={product.imagen} alt={product.nombre} width="100" />
            <h2>{product.nombre}</h2>
            <p>{product.descripcion}</p>
            <p>Precio: ${product.precio}</p>
            <p>Cantidad: {product.cantidad}</p>
            <Link to={`/edit/${product._id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;