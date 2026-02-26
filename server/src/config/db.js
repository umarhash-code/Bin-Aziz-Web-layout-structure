import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDb() {
  const connection = await mongoose.connect(env.mongoUri);
  console.log(`MongoDB connected: ${connection.connection.name}`);
}
