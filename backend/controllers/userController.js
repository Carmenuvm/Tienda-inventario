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

// Actualizar perfil propio
const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, select: '-password' }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error actualizando perfil' });
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


module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  updateProfile,
  addFavorite
};



