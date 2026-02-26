import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { normalizeEmail } from "../utils/auth.js";

export async function ensureAdmin() {
  const email = normalizeEmail(env.adminEmail);
  const exists = await User.findOne({ email });

  if (exists) {
    if (exists.role !== "admin") {
      exists.role = "admin";
      await exists.save();
    }
    return;
  }

  const passwordHash = await bcrypt.hash(env.adminPassword, 10);

  await User.create({
    name: env.adminName,
    email,
    password: passwordHash,
    role: "admin",
  });
}
