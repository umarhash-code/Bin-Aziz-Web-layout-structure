import { Course } from "../models/Course.js";

export async function getCourses(_req, res) {
  const courses = await Course.find().populate("createdBy", "name email").sort({ createdAt: -1 }).lean();
  return res.json({ courses });
}

export async function getCourseById(req, res) {
  const course = await Course.findById(req.params.id).populate("createdBy", "name email").lean();

  if (!course) {
    return res.status(404).json({ message: "course not found" });
  }

  return res.json({ course });
}

export async function createCourse(req, res) {
  const { title, description, price, image } = req.body || {};

  if (!title || !description || typeof price !== "number") {
    return res.status(400).json({ message: "title, description, and numeric price are required" });
  }

  const course = await Course.create({
    title: String(title).trim(),
    description: String(description),
    price,
    image: image ? String(image) : "",
    createdBy: req.user.id,
  });

  return res.status(201).json({ course });
}

export async function updateCourse(req, res) {
  const payload = { ...req.body };
  delete payload.createdBy;

  const course = await Course.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });

  if (!course) {
    return res.status(404).json({ message: "course not found" });
  }

  return res.json({ course });
}

export async function deleteCourse(req, res) {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "course not found" });
  }

  return res.json({ message: "course deleted" });
}
