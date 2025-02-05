// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
  const { nombre, apellido, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ nombre, apellido, email, password: hashedPassword });

  res.status(201).json({ token: generateToken(user._id) });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Credenciales inválidas.' });
  }

  res.json({ token: generateToken(user._id) });
};

module.exports = { register, login };