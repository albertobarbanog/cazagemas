import { payment } from '../mercadopago.js';

export const createOrder = async (req, res) => {
  const { cart } = req.body;

  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({
      message: 'Carro no puede estar vacío.',
    });
  }

  try {
    const items = cart.map((product) => ({
      title: product.name,
      unit_price: Number(product.price),
      currency_id: 'CLP',
      quantity: product.quantity || 1,
      description: product.description,
      picture_url: product.image,
    }));

    const preferenceData = {
      items,
      back_urls: {
        success: process.env.SUCCESS_URL,
        failure: process.env.FAILURE_URL,
        pending: process.env.PENDING_URL,
      },
      auto_return: 'approved',
      notification_url: process.env.NOTIFICATION_URL,
    };

    const response = await payment.create(preferenceData);

    res.status(201).json({
      id: response.body.id,
      init_point: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point,
    });
  } catch (error) {
    console.error('Error creando el pago', error);
    res.status(500).json({
      message: 'Error al crear el pago.',
      error: error.message,
    });
  }
};

export const failure = (req, res) => {
  res.status(200).json({ message: 'Pago Fallido' });
};

export const pending = (req, res) => {
  res.status(200).json({ message: 'Pago Pendiente' });
};

export const success = (req, res) => {
  res.status(200).json({ message: 'Pago Exitoso' });
};
