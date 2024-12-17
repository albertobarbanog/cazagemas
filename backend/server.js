import express from 'express';
import cors from 'cors'; // Importa el middleware CORS
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.route.js';
import contactRoutes from './routes/contact.route.js';
import productRoutes from './routes/product.route.js';
import mercadopagoRoutes from './routes/mercadopago.route.js';
import path from 'path';

dotenv.config(); // Carga las variables de entorno

const app = express();

// Configura CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Middleware para servir archivos estáticos
const __dirname = path.resolve();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/mercadopago', mercadopagoRoutes);
app.use('/api/contact', contactRoutes);

// Middleware para servir archivos estáticos
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
}

// Conecta a la base de datos y arranca el servidor
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
