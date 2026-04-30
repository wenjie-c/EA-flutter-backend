import mongoose from 'mongoose';
import Tarea, { ITareaModel } from '../models/Tarea';
import Organizacion from '../models/Organizacion';

interface ICreateTareaInput {
    titulo: string;
    fechaInicio: Date;
    fechaFin: Date;
    usuarios?: (mongoose.Types.ObjectId | string)[];
    status: string;
}

const createTareaByOrganizacion = async (organizacionId: string, data: ICreateTareaInput): Promise<ITareaModel | null> => {
    if (!mongoose.Types.ObjectId.isValid(organizacionId)) {
        return null;
    }

    const organizacion = await Organizacion.findById(organizacionId);
    if (!organizacion) {
        return null;
    }

    const tarea = new Tarea({
        _id: new mongoose.Types.ObjectId(),
        titulo: data.titulo,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        usuarios: data.usuarios || [],
        status: data.status,
        organizacionId: organizacionId
    });

    return await tarea.save();
};

const getTareasByOrganizacion = async (organizacionId: string): Promise<ITareaModel[]> => {
    if (!mongoose.Types.ObjectId.isValid(organizacionId)) {
        return [];
    }

    return await Tarea.find({ organizacionId }).populate({ path: 'usuarios', select: 'name' });
};

async function createTarea(data: Partial<ITareaModel>): Promise<ITareaModel | null> {
    const buffer = new Tarea({
        _id: new mongoose.Types.ObjectId(),
        ...data
    });
    return await buffer.save();
}

async function readTareaById(id: string): Promise<ITareaModel | null> {
    return await Tarea.findById(id).select('-__v');
}

async function readAllTarea(): Promise<ITareaModel[] | []> {
    return await Tarea.find().select('-__v');
}

async function updateTarea(id: string, data: Partial<ITareaModel>): Promise<ITareaModel | null> {
    return await Tarea.findByIdAndUpdate(id, data).select('-__v');
}

async function deleteTarea(id: string): Promise<ITareaModel | null> {
    return await Tarea.findByIdAndDelete(id).select('-__v');
}

async function readTareaByUsuario(id: string): Promise<ITareaModel[] | []> {
    return await Tarea.find({ usuarios: id }).populate({ path: 'usuarios', select: 'name' });
}

export default { createTareaByOrganizacion, getTareasByOrganizacion, createTarea, readAllTarea, readTareaById, updateTarea, deleteTarea, readTareaByUsuario };
