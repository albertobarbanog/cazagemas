import Contact from '../models/contact.model.js';
import nodemailer from 'nodemailer';

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configurar el correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: 'Nuevo mensaje de contacto',
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
