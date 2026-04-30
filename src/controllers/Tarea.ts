import { NextFunction, Request, Response } from 'express';
import TareaService from '../services/Tarea';
import Logging from '../library/Logging';

const createByOrganizacion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedTarea = await TareaService.createTareaByOrganizacion(req.params.organizacionId, req.body);
        return savedTarea ? res.status(201).json(savedTarea) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readByOrganizacion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tareas = await TareaService.getTareasByOrganizacion(req.params.organizacionId);
        return res.status(200).json(tareas);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

async function createTarea(req: Request, res: Response, next: NextFunction) {
    try {
        const buffer = await TareaService.createTarea({
            titulo: req.body.titulo,
            fechaInicio: req.body.fechaInicio,
            fechaFin: req.body.fechaFin,
            organizacionId: req.body.organizacionId,
            usuarios: req.body.usuarios,
            status: req.body.status
        });
        return res.status(201).json(buffer);
    } catch (error) {
        Logging.error(error);
        return res.status(500).json({ message: error });
    }
}

async function readTarea(req: Request, res: Response, next: NextFunction) {
    try {
        const buffer = await TareaService.readTareaById(req.params.id as string);
        if (buffer === null) return res.status(404);
        return res.status(200).json(buffer);
    } catch (error) {
        Logging.error(error);
        return res.status(500).json({ message: error });
    }
}

async function readAllTarea(req: Request, res: Response, next: NextFunction) {
    try {
        const buffer = await TareaService.readAllTarea();
        return res.status(200).json(buffer);
    } catch (error) {
        Logging.error(error);
        return res.status(500).json({ message: error });
    }
}

async function updateTarea(req: Request, res: Response, next: NextFunction) {
    try {
        const data = {
            titulo: req.body.titulo,
            fechaInicio: req.body.fechaInicio,
            fechaFin: req.body.fechaFin,
            organizacionId: req.body.organizacionId,
            usuarios: req.body.usuarios,
            status: req.body.status
        };
        const buffer = await TareaService.updateTarea(req.params.id as string, data);
        return res.status(200).json(buffer);
    } catch (error) {
        Logging.error(error);
        return res.status(500).json({ message: error });
    }
}

async function deleteTarea(req: Request, res: Response, next: NextFunction) {
    try {
        const buffer = await TareaService.deleteTarea(req.params.id as string);
        return res.status(200).json(buffer);
    } catch (error) {
        Logging.error(error);
        return res.status(500).json({ message: error });
    }
}

async function readTareaByUsuario(req: Request, res: Response, next: NextFunction) {
    try {
        const buffer = await TareaService.readTareaByUsuario(req.params.id);
        return res.status(200).json(buffer);
    } catch (error) {
        Logging.error(error);
        return res.status(500).json({ message: error });
    }
}

export default { createByOrganizacion, readByOrganizacion, createTarea, readAllTarea, readTarea, updateTarea, deleteTarea, readTareaByUsuario };
