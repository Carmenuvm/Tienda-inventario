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
router.get('/users', authMiddleware, isAdmin, getAllUsers);
router.put('/users/:id', authMiddleware, isAdmin, updateUser);
router.delete('/users/:id', authMiddleware, isAdmin, deleteUser);

// Rutas de perfil de usuario
router.put('/profile', authMiddleware, updateProfile);
router.post('/favorites', authMiddleware, addFavorite);

module.exports = router;