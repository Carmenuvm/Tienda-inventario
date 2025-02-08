// controllers/userController.js
const User = require('../models/User');


// Obtener todos los usuarios (solo admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Actualizar cualquier usuario (admin)
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, select: '-password' }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error actualizando usuario' });
  }
};

// Eliminar usuario (admin)
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando usuario' });
  }
};

// Actualizar perfil propio (versión corregida)
const updateProfile = async (req, res) => {
  try {
    const { nombre, email, telefono, direccion } = req.body;
    
    // Validaciones básicas
    if (!nombre || !email) {
      return res.status(400).json({ message: 'Nombre y email son requeridos' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { nombre, email, telefono, direccion },
      { new: true, runValidators: true }
    ).select('-password -__v');

    res.json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error actualizando perfil' });
  }
};

// Controlador mejorado con manejo de errores
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password -__v')
      .populate({
        path: 'favoritos',
        select: 'nombre descripcion precio imagen slug', 
        model: 'Product'
      });

    res.json(user);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error obteniendo perfil',
      error: error.message
    });
  }
};

const addFavorite = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user.favoritos.includes(productId)) {
      user.favoritos.push(productId);
      await user.save();
    }
    res.json(user.favoritos);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar favorito' });
  }
};

const removeFavorite = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    user.favoritos = user.favoritos.filter(fav => fav.toString() !== productId);
    await user.save();
    res.json(user.favoritos);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar favorito' });
  }
};


module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  updateProfile,
  getProfile,
  addFavorite,
  removeFavorite
};



