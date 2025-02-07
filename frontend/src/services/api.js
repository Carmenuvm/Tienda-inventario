// src/services/api.js/ agg api para manejar crud
import axios from 'axios';

// Crear una instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Función para iniciar sesión
export const login = (credentials) => api.post('/auth/login', credentials);

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, formData) => {
  return api.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getCategories = () => api.get('/products/categories');

export default api;