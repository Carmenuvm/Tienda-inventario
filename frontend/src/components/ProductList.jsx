import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { getCategories } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
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
      await api.delete(`/products/${id}`);
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
    <div className="container mt-4">
      <h1 className="mb-4">Inventario de Productos</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-select"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card">
              {product.imagen && (
                <img
                  src={bufferToBase64(product.imagen.data)}
                  alt={product.nombre}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.nombre}</h5>
                <p className="card-text">{product.descripcion}</p>
                <p className="card-text">Precio: ${product.precio}</p>
                <p className="card-text">Cantidad: {product.cantidad}</p>
                <Link to={`/edit/${product._id}`} className="btn btn-primary me-2">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;