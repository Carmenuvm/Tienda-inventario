// controllers/userController.js
const User = require('./models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Excluir la contraseña
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

module.exports = { addFavorite, updateProfile, getAllUsers };

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

module.exports = { addFavorite };
// controllers/userController.js
const updateProfile = async (req, res) => {
  const { nombre, apellido, direccion, telefono } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { nombre, apellido, direccion, telefono },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
};

module.exports = { addFavorite, updateProfile };
