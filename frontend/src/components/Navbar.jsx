import React from 'react';
import { Link } from 'react-router-dom';

const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/login'); // Redirigir al login
  };

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Tiendita
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Agregar Producto
              </Link>
            </li>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;