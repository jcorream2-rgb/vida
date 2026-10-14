import { Router } from 'express';
import mongoose from 'mongoose';
import Experiencia from '../models/Experiencia.js';

const router = Router();

router.use((request, response, next) => {
  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({
      error: 'La base de datos no está disponible. Verifique MONGODB_URI y MongoDB.',
    });
  }

  next();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Experiencia:
 *       type: object
 *       required: [puesto, empresa, fechaInicio, fechaFin, descripcion]
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *         puesto:
 *           type: string
 *           example: Desarrollador Full Stack
 *         empresa:
 *           type: string
 *           example: Digital Innovations Ltd.
 *         fechaInicio:
 *           type: string
 *           example: "2021"
 *         fechaFin:
 *           type: string
 *           example: Actualidad
 *         descripcion:
 *           type: string
 *           example: Desarrollo de aplicaciones web y APIs.
 *         logros:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Desarrollo con React y Node.js"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 */

/**
 * @swagger
 * /api/experiencias:
 *   get:
 *     summary: Lista todas las experiencias profesionales
 *     tags: [Experiencias]
 *     responses:
 *       200:
 *         description: Lista ordenada por fecha de creación
 *   post:
 *     summary: Crea una experiencia profesional
 *     tags: [Experiencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experiencia'
 *     responses:
 *       201:
 *         description: Experiencia creada
 *       400:
 *         description: Datos inválidos
 */
router.route('/')
  .get(async (request, response, next) => {
    try {
      const experiencias = await Experiencia.find().sort({ fechaInicio: -1, createdAt: -1 });
      response.json(experiencias);
    } catch (error) {
      next(error);
    }
  })
  .post(async (request, response, next) => {
    try {
      const experiencia = await Experiencia.create(request.body);
      response.status(201).json(experiencia);
    } catch (error) {
      next(error);
    }
  });

/**
 * @swagger
 * /api/experiencias/{id}:
 *   get:
 *     summary: Obtiene una experiencia por su ID
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Experiencia encontrada
 *       404:
 *         description: Experiencia no encontrada
 *   put:
 *     summary: Reemplaza los datos de una experiencia
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experiencia'
 *     responses:
 *       200:
 *         description: Experiencia actualizada
 *       400:
 *         description: Datos inválidos o ID incorrecto
 *       404:
 *         description: Experiencia no encontrada
 *   delete:
 *     summary: Elimina una experiencia
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Experiencia eliminada
 *       404:
 *         description: Experiencia no encontrada
 */
router.route('/:id')
  .get(async (request, response, next) => {
    try {
      const experiencia = await Experiencia.findById(request.params.id);
      if (!experiencia) {
        return response.status(404).json({ error: 'Experiencia no encontrada.' });
      }
      response.json(experiencia);
    } catch (error) {
      next(error);
    }
  })
  .put(async (request, response, next) => {
    try {
      const experiencia = await Experiencia.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true, runValidators: true, overwrite: true, upsert: false }
      );
      if (!experiencia) {
        return response.status(404).json({ error: 'Experiencia no encontrada.' });
      }
      response.json(experiencia);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (request, response, next) => {
    try {
      const experiencia = await Experiencia.findByIdAndDelete(request.params.id);
      if (!experiencia) {
        return response.status(404).json({ error: 'Experiencia no encontrada.' });
      }
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  });

export default router;