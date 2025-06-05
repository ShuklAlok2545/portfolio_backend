import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  contact: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const likeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    required: true,
    default: 0
  }
});

export const Like = model('likes', likeSchema);
export const Contact = model('Contact', contactSchema);