import express, { Router } from 'express';
import controller from '../controllers/Tarea';
import { Schemas, ValidateJoi } from '../middleware/Joi';
import { Schema } from 'mongoose';
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Tarea
 * components:
 *   schemas:
 *     Tarea:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Tarea's id
 *           example: 17y2187y23hu
 *         titulo:
 *           type: string
 *           description: Tarea's titulo
 *     CreateUpdateTarea:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *           description: Tarea's titulo
 */

router.post('/', ValidateJoi(Schemas.tarea.create), controller.createTarea);

router.get('/:id', controller.readTarea);

router.get('/usuario/:id', controller.readTareaByUsuario);

router.get('/', controller.readAllTarea);

router.put('/:id', ValidateJoi(Schemas.tarea.update), controller.updateTarea);

router.delete('/:id', controller.deleteTarea);

export default router;
