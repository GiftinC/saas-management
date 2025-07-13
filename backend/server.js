import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import clientRoutes from "./Routes/clientRoutes.js";
import productRoutes from "./Routes/productRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// DB Connection
const DBURL = process.env.DB_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(DBURL);
    console.log("MongoDB Connected Successfully using Mongoose ");
  } catch (error) {
    console.error("Error Connecting to MongoDB", error);
    process.exit(1);
  }
};
console.log("✅ DB_URL from .env:", process.env.DB_URL);

connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/products", productRoutes);

// Start The Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
