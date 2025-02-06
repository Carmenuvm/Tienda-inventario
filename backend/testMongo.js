const mongoose = require('mongoose');

const uri = "mongodb+srv://usuario:contraseña@cluster0.jdrqe.mongodb.net/nombreBaseDatos";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB correctamente"))
  .catch(err => console.error("❌ Error conectando a MongoDB:", err));
