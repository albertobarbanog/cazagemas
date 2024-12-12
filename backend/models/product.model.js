import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Añade timestamps a la colección, createdAt y updatedAt
  }
);

const Product = mongoose.model('Product', productSchema);
// products es el nombre de la colección en la base de datos

export default Product;
