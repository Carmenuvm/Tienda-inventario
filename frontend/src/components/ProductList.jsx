// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product._id !== id));
  };

  return (
    <div>
      <h1>Inventario de Productos</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <Link to={`/edit/${product._id}`}>Editar</Link>
            <button onClick={() => handleDelete(product._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;