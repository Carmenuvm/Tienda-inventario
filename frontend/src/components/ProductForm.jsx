// src/components/ProductForm.jsx
import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      nombre: '',
      descripcion: '',
      precio: '',
      cantidad: '',
      imagen: '',
      categoria: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Imagen (URL):</label>
        <input
          type="text"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Categoría:</label>
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductForm;