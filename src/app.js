import express from 'express';
import mongoose from 'mongoose';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import experienciasRouter from './routes/experiencias.js';

const app = express();

app.use(express.json({ limit: '20kb' }));

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API de experiencias profesionales',
      version: '1.0.0',
      description: 'CRUD de experiencias laborales para una hoja de vida.',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
    tags: [{ name: 'Experiencias' }],
  },
  apis: ['./src/routes/*.js'],
});

app.get('/api/health', (request, response) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  response.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? 'ok' : 'degraded',
    database: databaseConnected ? 'connected' : 'disconnected',
  });
});

app.use('/api/experiencias', experienciasRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((request, response) => {
  response.status(404).json({ error: 'Ruta no encontrada.' });
});

app.use((error, request, response, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return response.status(400).json({ error: 'El cuerpo de la solicitud no contiene JSON válido.' });
  }
  if (error instanceof mongoose.Error.ValidationError) {
    return response.status(400).json({
      error: 'Los datos enviados no son válidos.',
      detalles: Object.values(error.errors).map((validationError) => validationError.message),
    });
  }
  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).json({ error: 'El ID proporcionado no es válido.' });
  }

  console.error(error);
  response.status(500).json({ error: 'Error interno del servidor.' });
});

export default app;