# Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tu-usuario/cazagemas.git
   cd cazagemas
   ```

2. Instala las dependencias del backend y frontend:

   ```sh
   npm install
   npm install --prefix frontend
   ```

3. Configura las variables de entorno:
   - Crea los archivos [.env] en la carpeta raiz y uno en la carpeta frontend y usa los [.env.template].
   - Completa las variables de entorno con tus propios valores.

## Scripts

### Backend

- `npm run dev`: Inicia el servidor en modo desarrollo.
- `npm run build`: Instala las dependencias y construye el frontend.
- `npm start`: Inicia el servidor en modo producción.

### Frontend

- `npm run dev --prefix frontend`: Inicia el servidor de desarrollo de Vite.
- `npm run build --prefix frontend`: Construye la aplicación para producción.
- `npm run preview --prefix frontend`: Previsualiza la aplicación construida.

## Uso

1. Inicia el servidor backend:

   ```sh
   npm run dev
   ```

2. Inicia el servidor frontend:

   ```sh
   npm run dev --prefix frontend
   ```

3. Abre tu navegador y navega a `http://localhost:5173` para ver la aplicación en funcionamiento.

## Tecnologías Utilizadas

- **Frontend**:

  - React
  - Chakra UI
  - Vite
  - Zustand

- **Backend**:
  - Node.js
  - Express
  - Mongoose
  - JWT
  - MercadoPago SDK

## Funcionalidades

- **Autenticación**: Registro e inicio de sesión de usuarios.
- **Productos**: Visualización, creación, edición y eliminación de productos.
- **Carrito de Compras**: Agregar productos al carrito y actualizar cantidades.
- **Pagos**: Integración con MercadoPago para realizar pagos.
- **Contacto**: Envío de mensajes de contacto a través de un formulario.
