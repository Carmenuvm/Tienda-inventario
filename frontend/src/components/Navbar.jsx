import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaUser, FaUsers, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); //// Verificar autenticación

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <span className="h4">🛍️ Tiendita</span>
        </Link>
        
        {isAuthenticated && ( //// Solo mostrar contenido si está autenticado
          <>
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
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <FaHome className="me-2" />
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add" className="nav-link">
                    <FaPlus className="me-2" />
                    Agregar Producto
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    <FaUser className="me-2" />
                    Mi Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user-management" className="nav-link">
                    <FaUsers className="me-2" />
                    Usuarios
                  </Link>
                </li>
              </ul>
              
              <div className="d-flex align-items-center">
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline-light"
                >
                  <FaSignOutAlt className="me-2" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;