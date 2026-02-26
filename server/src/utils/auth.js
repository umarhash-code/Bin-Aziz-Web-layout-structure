import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function createToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role, email: user.email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

export function normalizeEmail(email) {
  return String(email || "").toLowerCase().trim();
}
