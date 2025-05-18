import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  contact: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

export default model('Contact', contactSchema);
