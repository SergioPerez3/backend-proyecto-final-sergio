# Backend Proyecto Final - Sergio

## Instalación


1. Clona el repositorio:

   ```bash
   git clone <repository_url>
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd backend-proyecto-final-sergio
   ```

3. Cambiar a la rama `dev`:

   ```bash
   git switch dev
   ```

4. Instala las dependencias:

   ```bash
   npm install
   ```

5. Crea un archivo `.env` basado en el archivo `.env-example` y configura tus variables de entorno:

   ```bash
   cp .env-example .env
   ```

   Luego, edita el archivo `.env` para agregar tu configuración personalizada, como el puerto y la URI de MongoDB.

6. Inicia el servidor:
   ```bash
   npm start
   ```
   Para desarrollo con recarga automática, puedes usar:
   ```bash
   npm run dev
   ```