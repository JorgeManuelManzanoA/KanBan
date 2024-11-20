const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const client = require('prom-client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para CORS
app.use(cors());

// Middleware para análisis de JSON
app.use(express.json());

// Configuración de Prometheus
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de solicitudes HTTP',
  labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpRequestCounter);

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Endpoint para métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Conexión a MongoDB
mongoose.connect('mongodb://mongo-db:27017/tesis', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión exitosa a MongoDB');
}).catch((error) => {
  console.error('Error al conectar con MongoDB:', error);
});

// Rutas de la API
app.use('/api/usuarios', require('./src/routes/user.routes'));

// Ruta base
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
