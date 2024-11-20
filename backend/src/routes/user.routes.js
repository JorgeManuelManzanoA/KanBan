const express = require('express');
const router = express.Router();

// Simulador de base de datos en memoria
let usuarios = [];

// Obtener todos los usuarios
router.get('/', (req, res) => {
  res.json(usuarios);
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { nombre, correo, contrasena, carrera, ciclo, seccion } = req.body;

  // Validar que los campos no estén vacíos
  if (!nombre || !correo || !contrasena || !carrera || !ciclo || !seccion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const nuevoUsuario = { nombre, correo, contrasena, carrera, ciclo, seccion };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

module.exports = router;
