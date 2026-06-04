
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
connectDB();

import express from "express";

const app = express();


app.get("/", (req, res) => {
    res.json({message: "Hello World!"});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));