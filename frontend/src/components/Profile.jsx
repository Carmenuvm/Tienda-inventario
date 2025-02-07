import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getProfile, updateProfile } from '../services/api';

const Profile = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    telefono: ''
  });

  useEffect(() => {
    // Obtener datos del usuario actual
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUserData(response.data || { 
          nombre: '',
          apellido: '',
          email: '',
          direccion: '',
          telefono: ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(userData);
      alert('Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Mi Perfil</h2>
      <Form onSubmit={handleSubmit}>
        {/* Campos del formulario para editar el perfil */}
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={userData.nombre || ''} // el valor nunca sea undefined
            onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            value={userData.apellido || ''} // el valor nunca sea undefined
            onChange={(e) => setUserData({ ...userData, apellido: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={userData.email || ''} // el valor nunca sea undefined
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDireccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            value={userData.direccion || ''} // el valor nunca sea undefined
            onChange={(e) => setUserData({ ...userData, direccion: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formTelefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            value={userData.telefono || ''} // el valor nunca sea undefined
            onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
      </Form>
    </div>
  );
};

export default Profile;