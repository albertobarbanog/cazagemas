import express from 'express';
import cors from 'cors'; // Importa el middleware CORS
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.route.js';
import contactRoutes from './routes/contact.route.js';
import productRoutes from './routes/product.route.js';
import mercadopagoRoutes from './routes/mercadopago.route.js';

dotenv.config(); // Carga las variables de entorno

const app = express();

// Configura CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/mercadopago', mercadopagoRoutes);
app.use('/api/contact', contactRoutes);

// Conecta a la base de datos y arranca el servidor
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
