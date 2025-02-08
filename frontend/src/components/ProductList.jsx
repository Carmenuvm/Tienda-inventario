import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../services/api';
import { getCategories, getProfile } from '../services/api';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify'; // Importar toast 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userFavorites, setUserFavorites] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

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
        setUserRole(profileResponse.data.role);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error al cargar los datos. Inténtalo de nuevo.'); // Notificación de error
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (userRole === 'user') {
      toast.error('No tienes permisos para eliminar productos'); // Notificación de error
      return;
    }
    
    // Confirmación con toast
    toast.info('¿Estás seguro de eliminar este producto?', {
      position: "top-center",
      autoClose: 5000,
      closeButton: true,
      draggable: true,
      onClick: async () => {
        try {
          await api.delete(`/products/${id}`);
          setProducts(products.filter((product) => product._id !== id));
          toast.success('Producto eliminado correctamente'); // Notificación de éxito
        } catch (error) {
          console.error('Error al eliminar el producto:', error);
          toast.error('Error al eliminar el producto. Inténtalo de nuevo.'); // Notificación de error
        }
      }
    });
  };

  const handleEdit = (e) => {
    if (userRole === 'user') {
      e.preventDefault();
      toast.error('No tienes permisos para editar productos'); // Notificación de error
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

      // Notificación de éxito
      toast.success(
        userFavorites.includes(productId) 
          ? 'Producto eliminado de favoritos' 
          : 'Producto añadido a favoritos'
      );
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error('Error al actualizar favoritos. Inténtalo de nuevo.'); // Notificación de error
    }
  };

  const handleImageClick = (imageData) => {
    setSelectedImage(bufferToBase64(imageData));
    setShowImageModal(true);
  };

  const bufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '');
    return `data:image/jpeg;base64,${btoa(binary)}`;
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === '' || product.categoria === selectedCategory) &&
      (searchTerm === '' || product.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="container-fluid mt-4">
      <h1 className="mb-4">Inventario de Productos</h1>
      
      {/* Filtros */}
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

      {/* Listado de productos */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="col">
            <div className="card h-100 shadow-sm">
              {product.imagen && (
                <img
                  src={bufferToBase64(product.imagen.data)}
                  alt={product.nombre}
                  className="card-img-top img-fluid cursor-pointer"
                  style={{ 
                    height: '250px', 
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleImageClick(product.imagen.data)}
                />
              )}
              
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title m-0 text-truncate">{product.nombre}</h5>
                  <button 
                    onClick={() => handleFavorite(product._id)}
                    className="btn btn-link p-0"
                  >
                    <FaStar 
                      color={userFavorites.includes(product._id) ? '#ffd700' : '#e4e5e9'} 
                      size={24}
                      className="star-icon transition-all"
                    />
                  </button>
                </div>
                
                <p className="card-text flex-grow-1">{product.descripcion}</p>
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="badge bg-primary">{product.categoria}</span>
                    <div>
                      <span className="fw-bold">${product.precio}</span>
                      <span className="text-muted ms-2">Stock: {product.cantidad}</span>
                    </div>
                  </div>
                  
                  {userRole !== 'user' && (
                    <div className="d-flex gap-2">
                      <Link 
                        to={`/edit/${product._id}`} 
                        className="btn btn-outline-primary btn-sm w-50"
                        onClick={handleEdit}
                      >
                        <FaEdit className="me-2" />
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-outline-danger btn-sm w-50"
                      >
                        <FaTrash className="me-2" />
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para imagen ampliada */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered>
        <Modal.Body className="p-0">
          <img 
            src={selectedImage} 
            alt="Ampliación" 
            className="img-fluid rounded"
            style={{ maxHeight: '80vh', objectFit: 'contain' }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductList;