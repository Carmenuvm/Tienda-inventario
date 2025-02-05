const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Desactivar la autenticación temporalmente
  next();
};

const isAdmin = (req, res, next) => {
  // Desactivar la verificación de administrador temporalmente
  next();
};

module.exports = { authMiddleware, isAdmin };