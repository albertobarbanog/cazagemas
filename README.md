# Aplicación Desplegada en Render.com

Adjunto el enlace de la app desplegada en [Render.com](https://cazagemas.onrender.com/). Asi se puede probar rapidamente.

## Credenciales de Prueba

Dejo una cuenta para poder acceder y utilizar todas las funcionalidades de la aplicación:

- **Usuario:** `admin@example.com`
- **Contraseña:** `123456`

### Funcionalidades Principales

La aplicación con la cuenta ingresada permite:

- Editar productos.
- Borrar productos.
- Agregar nuevos productos.

### Integración con MercadoPago

MercadoPago está asociado, pero dejé la API en modo **sandbox** para realizar pruebas seguras. La integración está lista para probar pagos y validar el flujo completo.

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/albertobarbanog/cazagemas.git
   cd cazagemas
   ```

2. Instala las dependencias del backend y frontend:

   ```sh
   npm install
   npm install --prefix frontend
   ```

3. Configura las variables de entorno:
   - Crea los archivos [.env] en la carpeta base y uno en la carpeta frontend y usa los [.env.template].
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
