import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login y registro

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      // Redirigir al usuario a la página principal o de administración
      window.location.href = '/'; // Redirige a la página principal
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        nombre,
        apellido,
        email,
        password,
        direccion,
        telefono,
      });
      localStorage.setItem('token', response.data.token);
      // Redirigir al usuario a la página principal o de administración
      window.location.href = '/'; // Redirige a la página principal
    } catch (error) {
      console.error('Error al registrarse:', error);
      alert('Error al registrarse. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">
                {isRegistering ? 'Regístrate' : 'Iniciar Sesión'}
              </h2>
              {isRegistering ? (
                // Formulario de registro
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="form-control"
                      placeholder="Nombre"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Apellido:</label>
                    <input
                      type="text"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      className="form-control"
                      placeholder="Apellido"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="Contraseña"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirmar Contraseña:</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control"
                      placeholder="Confirmar Contraseña"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dirección:</label>
                    <input
                      type="text"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      className="form-control"
                      placeholder="Dirección"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono:</label>
                    <input
                      type="text"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="form-control"
                      placeholder="Teléfono"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Registrarse
                  </button>
                  <p className="text-center mt-3">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="#" onClick={() => setIsRegistering(false)}>
                      Inicia Sesión
                    </Link>
                  </p>
                </form>
              ) : (
                // Formulario de inicio de sesión
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="Contraseña"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Iniciar Sesión
                  </button>
                  <p className="text-center mt-3">
                    ¿No tienes una cuenta?{' '}
                    <Link to="#" onClick={() => setIsRegistering(true)}>
                      Regístrate
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;