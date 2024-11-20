const mongoose = require("mongoose");

const URI = "mongodb://mongo-db:27017/kanban"; // Ajusta 'kanban' al nombre de tu base de datos

mongoose
  .connect(URI, {
    useNewUrlParser: true, // Aunque muestra una advertencia de depreciación, Mongoose lo ignora
    useUnifiedTopology: true, // Opcional si usas una versión moderna de Mongoose
  })
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));
