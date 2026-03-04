import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bin_aziz",
  jwtSecret: process.env.JWT_SECRET || "replace-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  corsOrigins: (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  adminName: process.env.ADMIN_NAME || "Admin",
  adminEmail: process.env.ADMIN_EMAIL || "admin@binaziz.com",
  adminPassword: process.env.ADMIN_PASSWORD || "Admin@12345",
};
