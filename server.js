import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import {Like,Contact} from './models/Contact.js';

import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  'https://shuklalokportfolio.netlify.app'
];

app.use(cors({
   origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }));

  app.options('/api/contact', cors());

app.use(express.json());

connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));


app.get('/', (req, res) => {
    res.send('Server is running');
  });


app.post('/api/contact', async (req, res) => {
  try {
    console.log(req.body);
    const { name, mail, contact, message } = req.body;
    if (!name || !mail || !contact || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newContact = new Contact({ name, mail, contact, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/api/likes', async (req, res) => {
  try {
    const like = await Like.findOne({ id: 'heart' });
    res.json({ count: like?.count || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch like count' });
  }
});


app.post('/api/like', async (req, res) => {
  try {
    await Like.findOneAndUpdate(
      { id: 'heart' },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
    res.json({ message: 'Like recorded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update like count' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


