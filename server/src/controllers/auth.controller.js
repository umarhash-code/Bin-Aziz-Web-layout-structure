import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { createToken, normalizeEmail } from "../utils/auth.js";

export async function register(req, res) {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, and password are required" });
  }

  if (String(password).length < 8) {
    return res.status(400).json({ message: "password must be at least 8 characters" });
  }

  const normalizedEmail = normalizeEmail(email);
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    return res.status(409).json({ message: "email already registered" });
  }

  const hashedPassword = await bcrypt.hash(String(password), 10);
  const user = await User.create({
    name: String(name).trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: "user",
  });

  return res.status(201).json({
    message: "registration successful",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}

export async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({ email: normalizeEmail(email) });

  if (!user) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(String(password), user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  const token = createToken(user);

  return res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}

export async function me(req, res) {
  const user = await User.findById(req.user.id).select("name email role createdAt updatedAt");

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  return res.json({ user });
}
