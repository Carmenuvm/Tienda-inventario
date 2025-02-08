import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Importar toast
import api from '../services/api'; // Importar la API para verificar el rol del usuario

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

  const [userRole, setUserRole] = useState(''); // Estado para almacenar el rol del usuario

  // Efecto para cargar el rol del usuario al montar el componente
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const profileResponse = await api.get('/users/profile'); // Obtener perfil del usuario
        setUserRole(profileResponse.data.role); // Guardar el rol del usuario
      } catch (error) {
        console.error('Error fetching user role:', error);
        toast.error('Error al cargar el rol del usuario.'); // Notificación de error
      }
    };

    fetchUserRole();
  }, []);

  // Efecto para cargar los datos iniciales si existen
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si el usuario tiene permisos
    if (userRole === 'user') {
      toast.error('No tienes permisos para agregar o editar productos.'); // Notificación de error
      return;
    }

    // Crear FormData para enviar la información
    const data = new FormData();
    for (const key in formData) {
      if (key === 'imagen' && typeof formData[key] === 'string') {
        // Si la imagen es una URL base64, no se agrega al FormData
        continue;
      }
      data.append(key, formData[key]);
    }

    // Llamar a la función onSubmit proporcionada por el componente padre
    onSubmit(data);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">{initialData ? 'Editar Producto' : 'Agregar Producto'}</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        {/* Campo: Nombre */}
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Campo: Descripción */}
        <div className="mb-3">
          <label className="form-label fw-bold">Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
          />
        </div>

        {/* Campo: Precio */}
        <div className="mb-3">
          <label className="form-label fw-bold">Precio:</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Campo: Cantidad */}
        <div className="mb-3">
          <label className="form-label fw-bold">Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Campo: Imagen */}
        <div className="mb-3">
          <label className="form-label fw-bold">Imagen:</label>
          {formData.imagen && typeof formData.imagen === 'string' && (
            <img
              src={formData.imagen}
              alt="Producto"
              width="100"
              className="img-thumbnail mb-2 d-block"
            />
          )}
          <input
            type="file"
            name="imagen"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Campo: Categoría */}
        <div className="mb-3">
          <label className="form-label fw-bold">Categoría:</label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Botón: Guardar */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;