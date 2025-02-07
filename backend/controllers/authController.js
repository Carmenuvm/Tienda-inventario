// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
  console.log(req.body);
  const { nombre, apellido, email, password, direccion, telefono } = req.body;

  if (req.body.confirmPassword && password !== req.body.confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      direccion,
      telefono,
      role: 'user',
    });
    res.status(201).json({ token: generateToken(user._id) });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario.' });
  }
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