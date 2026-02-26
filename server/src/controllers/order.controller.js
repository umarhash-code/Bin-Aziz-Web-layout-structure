import { Order } from "../models/Order.js";
import { Course } from "../models/Course.js";

export async function buyCourse(req, res) {
  const { courseId, paymentStatus } = req.body || {};

  if (!courseId) {
    return res.status(400).json({ message: "courseId is required" });
  }

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "course not found" });
  }

  const existingPurchase = await Order.findOne({ user: req.user.id, course: courseId });

  if (existingPurchase) {
    return res.status(409).json({ message: "course already purchased" });
  }

  const order = await Order.create({
    user: req.user.id,
    course: course._id,
    paymentStatus: paymentStatus || "paid",
  });

  return res.status(201).json({ order });
}

export async function getMyOrders(req, res) {
  const orders = await Order.find({ user: req.user.id }).populate("course", "title description price image").sort({ createdAt: -1 }).lean();
  return res.json({ orders });
}

export async function getPurchasedCourses(req, res) {
  const orders = await Order.find({ user: req.user.id, paymentStatus: "paid" })
    .populate("course", "title description price image")
    .sort({ createdAt: -1 })
    .lean();

  const purchasedCourses = orders
    .filter((order) => order.course)
    .map((order) => ({
      orderId: order._id,
      purchasedAt: order.createdAt,
      paymentStatus: order.paymentStatus,
      course: order.course,
    }));

  return res.json({ purchasedCourses });
}
