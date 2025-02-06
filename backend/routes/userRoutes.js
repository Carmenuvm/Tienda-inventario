// routes/userRoutes.js
const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { addFavorite } = require('../controllers/userController');

const router = express.Router();

router.post('/favorites', authMiddleware, addFavorite);
router.put('/profile', authMiddleware, updateProfile);
router.get('/', authMiddleware, isAdmin, getAllUsers);
module.exports = router;