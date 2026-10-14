import mongoose from 'mongoose';

const experienciaSchema = new mongoose.Schema(
  {
    puesto: {
      type: String,
      required: [true, 'El puesto es obligatorio'],
      trim: true,
      maxlength: [120, 'El puesto no puede superar 120 caracteres'],
    },
    empresa: {
      type: String,
      required: [true, 'La empresa es obligatoria'],
      trim: true,
      maxlength: [120, 'La empresa no puede superar 120 caracteres'],
    },
    fechaInicio: {
      type: String,
      required: [true, 'La fecha de inicio es obligatoria'],
      trim: true,
    },
    fechaFin: {
      type: String,
      required: [true, 'La fecha de fin es obligatoria (use "Actualidad" si aplica)'],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
      maxlength: [2000, 'La descripción no puede superar 2000 caracteres'],
    },
    logros: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [300, 'Cada logro no puede superar 300 caracteres'],
        },
      ],
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Experiencia', experienciaSchema);