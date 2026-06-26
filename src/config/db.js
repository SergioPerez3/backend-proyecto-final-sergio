import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import { configDotenv } from "dotenv";

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
export default connectDB;
