import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IOrganizacion {
    name: string;
    // por que pones que es una relacion n..1 directa??? en el modelo usuario ya tenemos un campo organizacion, con un lookup reverso ya tenemos suficiente.
    //usuarios: Types.ObjectId[] | string[];
}

export interface IOrganizacionModel extends IOrganizacion, Document {}

const OrganizacionSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        //usuarios: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
    },
    {
        versionKey: false,
	// Virtuales, para que haga una reverse lookup
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
    }
);

OrganizacionSchema.virtual('usuarios', {
	ref: 'Usuario',
	localField: '_id',
	foreignField: 'organizacion',
	justOne: false
});

export default mongoose.model<IOrganizacionModel>('Organizacion', OrganizacionSchema);
