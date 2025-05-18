import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import Contact from './models/Contact.js';

import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Define your MongoDB connection string here (replace with your actual URI)

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: 'http://127.0.0.1:5501',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }));

  app.options('/api/contact', cors());
  
app.use(express.json());

connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// import express from 'express';

// const app = express();
// const PORT = 4000;

// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


