import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";

import Product from "../models/Product.js";

const products = [
  {
    name: "Bolso Gucci",
    description: "Bolso de cuero auténtico con detalles metálicos.",
    price: 450,
    category: "Moda y accesorios",
    image: "https://picsum.photos/300/200?random=1",
    createdAt: "2024-01-10",
  },
  {
    name: "Reloj Rolex",
    description: "Reloj automático con 5200 joyas internas.",
    price: 1200,
    category: "Moda y accesorios",
    image: "https://picsum.photos/300/200?random=2",
    featured: true,
    createdAt: "2024-02-01",
  },
  {
    name: "Auriculares Sony WH-1000XM4",
    description: "Cancelación de ruido y sonido premium.",
    price: 180,
    category: "Tecnología y electrónica",
    image: "https://picsum.photos/300/200?random=3",
    createdAt: "2024-03-12",
  },
  {
    name: "Portátil Lenovo i7",
    description: "16GB RAM, SSD 512GB, perfecto para trabajo.",
    price: 650,
    category: "Tecnología y electrónica",
    image: "https://picsum.photos/300/200?random=4",
    createdAt: "2024-01-25",
  },
  {
    name: "Zapatillas Nike Air",
    description: "Edición limitada, muy cómodas.",
    price: 95,
    category: "Moda y accesorios",
    image: "https://picsum.photos/300/200?random=5",
    createdAt: "2024-02-20",
  },
  {
    name: "Smartwatch Samsung Galaxy Watch 5",
    description: "Monitor de salud, GPS integrado y batería de larga duración.",
    price: 220,
    category: "Tecnología y electrónica",
    image: "https://picsum.photos/300/200?random=6",
    createdAt: "2024-03-01",
  },
  {
    name: "Chaqueta North Face",
    description: "Chaqueta impermeable y térmica ideal para invierno.",
    price: 85,
    category: "Moda y accesorios",
    image: "https://picsum.photos/300/200?random=7",
    featured: true,
    createdAt: "2024-02-15",
  },
  {
    name: "Bicicleta de montaña Orbea",
    description: "Cuadro de aluminio, frenos hidráulicos y 24 velocidades.",
    price: 350,
    category: "Deporte y ocio",
    image: "https://picsum.photos/300/200?random=8",
    createdAt: "2024-01-30",
  },
  {
    name: "Aspiradora Dyson V10",
    description: "Potente aspiradora sin cable con autonomía de 60 minutos.",
    price: 260,
    category: "Hogar y jardín",
    image: "https://picsum.photos/300/200?random=9",
    featured: true,
    createdAt: "2024-03-05",
  },
  {
    name: "Mesa de centro nórdica",
    description: "Mesa de madera maciza con diseño minimalista.",
    price: 120,
    category: "Mobiliario y decoración",
    image: "https://picsum.photos/300/200?random=10",
    createdAt: "2024-02-28",
  },
  {
    name: "Colección de discos de vinilo",
    description: "Incluye clásicos de rock, jazz y soul.",
    price: 75,
    category: "Libros, música y películas",
    image: "https://picsum.photos/300/200?random=11",
    featured: true,
    createdAt: "2024-01-18",
  },
  {
    name: "Taladro Bosch Professional",
    description: "Taladro percutor de 750W con maletín y accesorios.",
    price: 95,
    category: "Herramientas y bricolaje",
    image: "https://picsum.photos/300/200?random=12",
    createdAt: "2024-03-10",
  },
  {
    name: "Set de figuras coleccionables",
    description: "Figuras de edición limitada para coleccionistas.",
    price: 40,
    category: "Otros",
    image: "https://picsum.photos/300/200?random=13",
    featured: true,
    createdAt: "2024-02-22",
  },
  {
  name: "Smartwatch Samsung Galaxy Watch 5",
  description: "Monitor de salud, GPS integrado y batería de larga duración.",
  price: 180,
  category: "Tecnología y electrónica",
  image: "https://picsum.photos/300/200?random=14",
  featured: true,
  createdAt: "2024-03-15",
},
{
  name: "Chaqueta de cuero Zara",
  description: "Chaqueta elegante de cuero sintético, estilo urbano.",
  price: 55,
  category: "Moda y accesorios",
  image: "https://picsum.photos/300/200?random=15",
  createdAt: "2024-02-12",
},
{
  name: "Patinete eléctrico Xiaomi Mi Scooter",
  description: "Autonomía de 30 km y velocidad máxima de 25 km/h.",
  price: 220,
  category: "Deporte y ocio",
  image: "https://picsum.photos/300/200?random=16",
  featured: true,
  createdAt: "2024-03-20",
},
{
  name: "Lámpara LED de escritorio",
  description: "Luz regulable con brazo flexible y bajo consumo.",
  price: 25,
  category: "Hogar y jardín",
  image: "https://picsum.photos/300/200?random=17",
  createdAt: "2024-01-27",
},
{
  name: "Silla ergonómica de oficina",
  description: "Respaldo ajustable, soporte lumbar y ruedas silenciosas.",
  price: 140,
  category: "Mobiliario y decoración",
  image: "https://picsum.photos/300/200?random=18",
  featured: true,
  createdAt: "2024-03-02",
},
{
  name: "Colección de libros de fantasía",
  description: "Incluye tres novelas de aventuras épicas.",
  price: 30,
  category: "Libros, música y películas",
  image: "https://picsum.photos/300/200?random=19",
  createdAt: "2024-02-05",
},
{
  name: "Caja de herramientas completa",
  description: "Incluye llaves, destornilladores, alicates y más.",
  price: 45,
  category: "Herramientas y bricolaje",
  image: "https://picsum.photos/300/200?random=20",
  featured: true,
  createdAt: "2024-03-12",
},
{
  name: "Puzzle 3D de arquitectura",
  description: "Modelo detallado para montar y exhibir.",
  price: 22,
  category: "Otros",
  image: "https://picsum.photos/300/200?random=21",
  createdAt: "2024-02-18",
},
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Producto cargado correctamente");
    process.exit(0);
  } catch (error) {
    console.log("error.message");
    process.exit(1);
  }
};

seedProducts();
