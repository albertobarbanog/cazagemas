import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.get('/products', (req, res) => {
  res.send('Hello World!');
});

console.log(process.env.MONGO_URI);

app.listen(4000, () => {
  connectDB();
  console.log('Server started at http://localhost:4000');
});
