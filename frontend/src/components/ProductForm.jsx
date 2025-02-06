// frontend/src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      nombre: '',
      descripcion: '',
      precio: '',
      cantidad: '',
      imagen: null,
      categoria: '',
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === 'imagen' && typeof formData[key] === 'string') {
        // Si la imagen es una URL base64, no la agregues al FormData
        continue;
      }
      data.append(key, formData[key]);
    }
    onSubmit(data);
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
        <label>Imagen:</label>
        {formData.imagen && typeof formData.imagen === 'string' && (
          <img src={formData.imagen} alt="Producto" width="100" />
        )}
        <input
          type="file"
          name="imagen"
          onChange={handleChange}
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