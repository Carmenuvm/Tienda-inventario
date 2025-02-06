const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const { page = 1, limit = 10, categoria } = req.query;
  const query = { cantidad: { $gt: 0 } };

  if (categoria) {
    query.categoria = categoria;
  }

  const products = await Product.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.json(products);
};

const createProduct = async (req, res) => {
  console.log('Datos del producto:', req.body); // Verifica los datos aquí
  const { nombre, descripcion, precio, cantidad, imagen, categoria } = req.body;
  try {
    const product = await Product.create({ nombre, descripcion, precio, cantidad, imagen, categoria });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el producto', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { nombre, descripcion, precio, cantidad, categoria } = req.body;
  let imagen = req.file ? req.file.buffer : undefined;

  try {
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) return res.status(404).json({ message: 'Producto no encontrado' });

    // Si no se proporciona una nueva imagen, usa la existente
    if (!imagen) {
      imagen = existingProduct.imagen;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, precio, cantidad, imagen, categoria },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct };