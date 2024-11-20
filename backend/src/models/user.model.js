const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
    carrera: { type: String, required: true },
    ciclo: { type: String, required: true },
    seccion: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
