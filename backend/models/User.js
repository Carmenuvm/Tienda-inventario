// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    minlength: [2, 'El nombre debe tener al menos 2 caracteres']
  },
  apellido: { 
    type: String, 
    required: [true, 'El apellido es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Ingresa un email válido']
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  direccion: String,
  telefono: {
    type: String,
    trim: true
  },
  favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);