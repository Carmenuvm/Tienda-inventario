// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Importar middleware
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

// Importar controladores
const {
  getAllUsers,
  updateUser,
  deleteUser,
  updateProfile,
  addFavorite
} = require('../controllers/userController');

// Rutas de administración
router.get('/', authMiddleware, isAdmin, getAllUsers); // Cambiado de '/users' a '/'
router.put('/:id', authMiddleware, isAdmin, updateUser); // Cambiado de '/users/:id' a '/:id'
router.delete('/:id', authMiddleware, isAdmin, deleteUser); // Cambiado de '/users/:id' a '/:i
// Rutas de perfil de usuario
router.put('/profile', authMiddleware, updateProfile);
router.post('/favorites', authMiddleware, addFavorite);

module.exports = router;