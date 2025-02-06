// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct, getCategories } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === '' || product.categoria === selectedCategory) &&
      (searchTerm === '' || product.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Función para convertir Buffer a base64 en el navegador
  const bufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '');
    return `data:image/jpeg;base64,${btoa(binary)}`;
  };

  return (
    <div>
      <h1>Inventario de Productos</h1>
      <div>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product._id}>
            {product.imagen && (
              <img src={bufferToBase64(product.imagen.data)} alt={product.nombre} width="100" />
            )}
            <h2>{product.nombre}</h2>
            <p>{product.descripcion}</p>
            <p>Precio: ${product.precio}</p>
            <p>Cantidad: {product.cantidad}</p>
            <Link to={`/edit/${product._id}`}>Editar</Link>
            <button onClick={() => handleDelete(product._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;