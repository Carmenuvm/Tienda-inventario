import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getProfile, updateProfile, updateUser } from '../services/api';
import { toast } from 'react-toastify'; // Importar toast para notificaciones
import { Link } from 'react-router-dom';
import { bufferToDataURL } from '../utils/images';
import './Profile.css';
import { FaUser, FaHeart, FaBox, FaSignOutAlt, FaEdit, FaPhone } from 'react-icons/fa';
import Modal from 'react-modal';

// Configurar modal para accesibilidad
Modal.setAppElement('#root');

const Profile = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    telefono: '',
    favoritos: []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  // Obtener datos del perfil al cargar el componente
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const data = response.data;
        setUserData({
          ...data,
          favoritos: data.favoritos || []
        });
        setFormData({
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono || '',
          direccion: data.direccion || ''
        });
      } catch (error) {
        toast.error('Error cargando perfil');
      }
    };
    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar datos antes de enviar
    if (!formData.nombre || !formData.email) {
      toast.error('Nombre y email son requeridos');
      return;
    }

    try {
      const response = await updateProfile({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion
      });
      
      setUserData(prev => ({ ...prev, ...response.data }));
      setModalIsOpen(false);
      toast.success('Perfil actualizado');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar');
    }
  };

  const handleEliminarFavorito = (productoId) => {
    // Lógica para eliminar de favoritos
  };

  return (
    <div className="profile-container">
      {/* Sección de Perfil */}
      <div className="profile-section">
        <div className="profile-header">
          <div className="user-avatar">
            <FaUser className="user-icon" />
          </div>
          <h2 className="profile-title">
            Hola, <span>{userData.nombre}</span>
          </h2>
          <button 
            onClick={() => setModalIsOpen(true)}
            className="edit-button"
          >
            <FaEdit className="mr-2" />
            Editar Perfil
          </button>
        </div>

        {/* Modal de Edición */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="edit-modal"
          overlayClassName="modal-overlay"
        >
          <h2 className="modal-title">Editar Perfil</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Teléfono:</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                pattern="[0-9]{10}"
                placeholder="Ej: 5512345678"
              />
            </div>

            <div className="form-group">
              <label>Dirección:</label>
              <textarea
                name="direccion"
                value={formData.direccion}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                rows="3"
              />
            </div>

            <div className="modal-actions">
              <button type="button" onClick={() => setModalIsOpen(false)}>
                Cancelar
              </button>
              <button type="submit">
                Guardar
              </button>
            </div>
          </form>
        </Modal>

        <div className="profile-info">
          <div className="info-item">
            <label>Email:</label>
            <p>{userData.email}</p>
          </div>
          <div className="info-item">
            <label>Dirección:</label>
            <p>{userData.direccion || 'Sin dirección registrada'}</p>
          </div>
          <div className="info-item">
            <label><FaPhone className="info-icon" /> Teléfono:</label>
            <p>{userData.telefono || 'No registrado'}</p>
          </div>
        </div>
      </div>

      {/* Sección de Favoritos */}
      <div className="favoritos-section">
        <div className="section-header">
          <FaHeart className="section-icon" />
          <h3>Mis Favoritos</h3>
        </div>
        
        <div className="favoritos-grid">
          {userData.favoritos?.map((producto) => (
            <div key={producto._id} className="product-card">
              <div className="image-container">
                <img
                  src={bufferToDataURL(producto.imagen, producto.contentType)}
                  alt={producto.nombre}
                  className="product-image"
                  onError={(e) => e.target.src = '/imagen-fallback.jpg'}
                />
              </div>
              
              <div className="product-details">
                <h3 className="product-title">{producto.nombre}</h3>
                {producto.descripcion && (
                  <p className="product-description">{producto.descripcion}</p>
                )}
                <div className="product-footer">
                  <span className="product-price">${producto.precio}</span>
                  <button 
                    className="remove-button"
                    onClick={() => handleEliminarFavorito(producto._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;