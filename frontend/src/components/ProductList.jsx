import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import api from '../services/api';
import { getCategories, getProfile } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener productos y categorías
        const productsResponse = await api.get('/products');
        const categoriesResponse = await getCategories();
        
        // Obtener favoritos del usuario
        const profileResponse = await getProfile();
        
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setUserFavorites(profileResponse.data.favoritos || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleFavorite = async (productId) => {
    try {
      await api.post('/users/favorites', { productId });
      
      // Actualizar estado local
      setUserFavorites(prev => 
        prev.includes(productId) 
          ? prev.filter(id => id !== productId)
          : [...prev, productId]
      );
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === '' || product.categoria === selectedCategory) &&
      (searchTerm === '' || product.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

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
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title m-0">{product.nombre}</h5>
                  <button 
                    onClick={() => handleFavorite(product._id)}
                    className="btn btn-link p-0"
                  >
                    <FaStar 
                      color={userFavorites.includes(product._id) ? '#ffd700' : '#e4e5e9'} 
                      size={24}
                      className="star-icon"
                    />
                  </button>
                </div>
                <p className="card-text">{product.descripcion}</p>
                <p className="card-text">Precio: ${product.precio}</p>
                <p className="card-text">Cantidad: {product.cantidad}</p>
                <div className="d-flex gap-2">
                  <Link to={`/edit/${product._id}`} className="btn btn-primary">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;