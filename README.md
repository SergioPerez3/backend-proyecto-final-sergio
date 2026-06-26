# Backend Proyecto Final - Sergio

API REST desarrollada con Node.js, Express y MongoDB para una web de compra-venta.

---

# Características

- CRUD completo de productos
- Registro de usuarios
- Inicio de sesión con JWT
- Contraseñas encriptadas con bcrypt
- Autenticación mediante Bearer Token
- MongoDB Atlas
- Seeder de datos iniciales
- Tests con Vitest y Supertest

---

# 🛠 Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors
- Vitest
- Supertest

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <repository_url>
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd backend-proyecto-final-sergio
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

# Variables de entorno

Crear un archivo `.env` utilizando como referencia `.env.example`.

## .env.example

```env
PORT=
MONGODB_URI=
JWT_SECRET=
```

## Ejemplo

```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/moviesdb
JWT_SECRET=mi-clave-secreta
```

---

# Ejecutar en desarrollo

```bash
npm run dev
```

---

# Ejecutar en producción

```bash
npm start
```

---

# Ejecutar tests

```bash
npm test
```

---

# Cargar datos iniciales

Si quieres cargar datos de ejemplo, puedes ejecutar este seeder

```bash
node src/seeders/product.seeder.js
```

---

# Endpoints

 Una vez que el servidor esté en funcionamiento, puedes acceder a la API a través de http://localhost:<PORT>/api, donde <PORT> es el puerto que configuraste en tu archivo .env.

## Home

### GET /

Devuelve un mensaje de bienvenida.

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "message": "Bienvenido a la API de compra-venta"
}
```

---

# Autenticación

## Registro

### POST /api/auth/register

Registra un nuevo usuario.

### Body

```json
{
  "name": "Sergio Pérez",
  "email": "example2@example.com",
  "password": "123456"
}
```

### Respuesta Exitosa

#### Status: 201 Created

```json
{
  "message": "Usuario registrado correctamente"
}
```

### Posibles Errores

#### Status: 400 Bad Request

```json
{
  "message": "Todos los campos son obligatorios"
}
```

#### Status: 400 Bad Request

```json
{
  "message": "El correo ya esta"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

## Login

### POST /api/auth/login

Inicia sesión y devuelve un token JWT.

### Body

```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "message": "Inicio de sesión correctamente",
  "token": "jwt_generado_aquí",
  "user": {
    "_id": "id_del_usuario",
    "name": "Sergio Pérez",
    "email": "example2@example.com"
  }
}
```

### Posibles Errores

#### Status: 400 Bad Request

```json
{
  "message": "Todos los campos son obligatorios"
}
```

#### Status: 422 Unprocessable Entity

```json
{
  "message": "El correo no es válido"
}
```

#### Status: 422 Unprocessable Entity

```json
{
  "message": "Contraseña muy corta, mínimo 6 caracteres"
}
```

#### Status: 401 Unauthorized

```json
{
  "message": "Credenciales inválidas"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

# Productos

## Obtener todos las productos

### GET /api/products

Devuelve todos los productos.

### Respuesta Exitosa

#### Status: 200 OK

```json
[
  {
    "_id": "6a3ac14a1e25453df7afc53b",
    "name": "Aspiradora Dyson V10",
    "price": 260,
    "category": "Hogar y jardín",
    "image": "Aspiradora.jpg",
    "featured": true,
    "createdAt": "2024-03-05T00:00:00.000Z",
    "updatedAt": "2026-06-23T17:24:26.625Z"
  }
]
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error al obtener los productos"
}
```

---

## Obtener categorias de productos

### GET /api/products/categories

Devuelve todas las categorías disponibles.

### Respuesta Exitosa

#### Status: 200 OK

```json
["Tecnología", "Moda", "Hogar", "Deportes"]
```

### Posibles Errores

#### Status: 500 Internal Server Error

```json
{
  "message": "Error al obtener las categorias"
}
```

---

## Obtener productos destacados

### GET /api/products/featured

Devuelve todos los productos marcados como destacados.

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "products": [
    {
      "_id": "...",
      "name": "PlayStation 5",
      "price": 499,
      "category": "Tecnología",
      "image": "https://...",
      "featured": true
    }
  ]
}
```

### Posibles Errores

#### Status: 500 Internal Server Error

```json
{
  "message": "Error al obtener los productos destacados"
}
```

---

## Obtener producto por ID

### GET /api/products/:id

Devuelve un producto por su ID.

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "_id": "...",
  "name": "iPhone 15",
  "price": 999,
  "category": "Tecnología",
  "image": "https://...",
  "featured": false,
  "description": "..."
}
```

### Posibles Errores

#### Status: 404 Not Found

```json
{
  "message": "Product not found"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error fetching product"
}
```

---

## Crear producto

### POST /api/products

Requiere autenticación.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Body

```json
{
  "name": "iPhone 15",
  "price": 999,
  "category": "Tecnología y electrónica",
  "image": "https://...",
  "featured": false
}
```

### Respuesta Exitosa

#### Status: 201 Created

```json
{
  "_id": "...",
  "name": "iPhone 15",
  "price": 999,
  "category": "Tecnología y electrónica",
  "image": "https://...",
  "featured": false
}
```

### Posibles Errores

#### Status: 422 Unprocessable Entity

```json
{
  "message": "All fields are required"
}
```

#### Status: 401 Unauthorized

```json
{
  "message": "No autorizado"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error creating product"
}
```

---

## Actualizar producto

### PUT /api/products/:id

Requiere autenticación.

### Headers

```txt
Authorization: Bearer TOKEN
```

Traes el producto por el ID y lo modificas (ejemplo)

```json
{
  "name": "iPhone 15 Pro",
  "price": 1199
}
```
```json
{
  "name": "iPhone 15 Pro",
  "price": 3000
}
```
### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "_id": "...",
  "name": "iPhone 15 Pro",
  "price": 3000,
  "category": "Tecnología",
  "image": "https://...",
  "featured": false
}
```

### Posibles Errores


#### Status: 422 Unprocessable Entity

```json
{
  "message": "El nombre tiene que ser un string"
}
```



#### Status: 422 Unprocessable Entity

```json
{
  "message": "Validation error message"
}
```

#### Status: 404 Not Found

```json
{
  "message": "CastError: Invalid ID"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor al actualizar producto"
}
```

---

## Eliminar producto

### DELETE /api/product/:id

Requiere autenticación.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "message": "Producto borrado correctamente"
}
```

### Posibles Errores

#### Status: 401 Unauthorized

```json
{
  "message": "Credenciales inválidas"
}
```

#### Status: 404 Not Found

```json
{
  "message": "Producto no encontrado"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor al borrar el producto"
}
```

---

# Favoritos

## Obtener todos los favoritos



# Deploy

Backend desplegado en Render.

```txt
https://mi-api.onrender.com
```

---

# Estructura del proyecto

```txt
src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── seeders/
│
 tests/
│
app.js
│
index.js
```

---

# Autor

Proyecto desarrollado como práctica del curso Full Stack de Neoland.

Autor: Sergio Pérez Pérez
