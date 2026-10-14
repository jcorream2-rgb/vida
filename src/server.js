import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const port = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hoja_vida';

app.listen(port, () => {
  console.log(`API disponible en http://localhost:${port}`);
  console.log(`Documentación Swagger: http://localhost:${port}/api-docs`);
});

mongoose.connect(mongoUri).catch((error) => {
  console.error(`No se pudo conectar a MongoDB: ${error.message}`);
});