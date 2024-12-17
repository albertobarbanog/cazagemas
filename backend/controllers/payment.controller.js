import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { ACCESS_TOKEN } from '../config/access_token.js';

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
  options: {
    timeout: 5000,
  },
});
const payment = new Payment(client);

export const createOrder = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({
        message: 'Carro no puede estar vacío.',
      });
    }

    const payer = {
      email: 'comprador.nuevo@mail.com',
      first_name: 'Alberto',
      last_name: 'Barbano',
      phone: {
        area_code: '1',
        number: '1234567',
      },
      address: {
        street_name: 'Calle 123',
        street_number: '123',
        zip_code: '123456',
        city: 'Santiago',
      },
      identification: {
        type: 'DNI',
        number: '123456789',
      },
    };

    const items = cart.map((product) => ({
      id: product.id,
      title: product.name,
      description: product.description,
      picture_url: product.image,
      category_id: product.category_id,
      quantity: product.quantity || 1,
      unit_price: Number(product.price),
    }));

    let result;
    const preference = new Preference(client);
    await preference
      .create({
        body: {
          items,
          payer,
          redirect_urls: {
            success: process.env.SUCCESS_URL,
            failure: process.env.FAILURE_URL,
            pending: process.env.PENDING_URL,
          },
          back_urls: {
            success: 'http://localhost:4000/api/pago/success',
            failure: 'http://localhost:4000/api/pago/failure',
            pending: 'http://localhost:4000/api/pago/pending',
          },
          notification_url: process.env.NOTIFICATION_URL,
          auto_return: 'approved',
        },
        requestOptions: {
          timeout: 5000,
        },
      })
      .then((x) => {
        console.log(x);
        result = x;
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('Pago creado: ', result);
    res.status(200).json({ url: result?.sandbox_init_point });
  } catch (error) {
    console.log('Error al crear un pago: ', error);
    res.status(500).json({ message: 'Error al crear el pago' });
  }
};

export const success = async (req, res) => {
  try {
    const data = req.query;
    console.log('Data del pago recibido:', data);
    res.status(200).json({
      message: 'Pago realizado de forma exitosa',
      data,
    });
  } catch (error) {
    console.log('Error en el pago: ', error);
  }
};

export const failure = async (req, res) => {
  try {
    const data = req.query;
    console.log('Data del pago recibido:', data);
  } catch (error) {
    console.log('Error en el pago: ', error);
  }
};

export const pending = async (req, res) => {
  try {
    const data = req.query;
    console.log('Data del pago recibido:', data);
  } catch (error) {
    console.log('Error en el pago: ', error);
  }
};

export const webhook = async (req, res) => {
  try {
    const paymentData = req.body;
    console.log('Notificación recibida:', paymentData);

    res.status(200).send('Notificación recibida');
  } catch (error) {
    console.error('Error al procesar la notificación:', error);
    res.status(500).send('Error al procesar la notificación');
  }
};
