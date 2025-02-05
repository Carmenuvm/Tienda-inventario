const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  imagen: { type: String, required: true },
  categoria: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);