import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt'; // Si usas contraseñas hash

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Intento de inicio de sesión para el correo: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      console.log('Contraseña inválida');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, // Debe estar configurado en el archivo .env
      { expiresIn: '1h' }
    );

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error.message);
    res
      .status(500)
      .json({ message: 'Error interno del servidor', error: error.message });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Correo y contraseña son requeridos.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está en uso.' });
    }

    // Encripta la contraseña antes de guardar
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    res.status(500).json({
      message: 'Error al registrar el usuario.',
      error: error.message,
    });
  }
};
