// src/pages/Home.jsx
import React from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido al Inventario de la Tienda</h1>
      <ProductList />
    </div>
  );
};

export default Home;