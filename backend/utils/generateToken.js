// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => { // <- Añadir parámetro "role"
  return jwt.sign(
    { 
      id: userId,
      role // <- Incluir el rol en el payload
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );
};

module.exports = generateToken;