import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`); // Cambiado a backticks
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`); // Cambiado a backticks
    process.exit(1); // Código 1 indica fallo, 0 es éxito
  }
};
