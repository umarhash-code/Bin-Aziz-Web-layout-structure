import { Course } from "../models/Course.js";
import { User } from "../models/User.js";

export async function ensureSeedData() {
  const count = await Course.countDocuments();
  if (count > 0) {
    return;
  }

  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    return;
  }

  const defaultCourses = [
    {
      title: "Full-Stack Web Development",
      description: "Build production-ready web apps with React, APIs, databases, and deployment workflows.",
      price: 24999,
      image: "",
      createdBy: admin._id,
    },
    {
      title: "Data Science Bootcamp",
      description: "Learn Python, data analysis, visualization, and machine learning through practical projects.",
      price: 34999,
      image: "",
      createdBy: admin._id,
    },
    {
      title: "Mobile App Engineering",
      description: "Create Android and cross-platform applications with modern architecture and clean UI.",
      price: 29999,
      image: "",
      createdBy: admin._id,
    },
  ];

  await Course.insertMany(defaultCourses);
}
