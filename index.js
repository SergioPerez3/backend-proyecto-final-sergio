
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
connectDB();

import express from "express";

import productRouter from "./src/routes/product.router.js"

import cors from "cors";



const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.json({message: "Hello World!"});
});

app.use("/api/products", productRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

