import { Router } from "express";
import { getAllUsers, deleteUser } from "../controllers/user.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get("/users", asyncHandler(getAllUsers));
router.delete("/users/:id", asyncHandler(deleteUser));

router.patch("/users/:id", async (req, res) => {
  const { role } = req.body || {};
  const { User } = await import("../models/User.js");
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { ...(role ? { role } : {}) },
    { new: true, runValidators: true }
  ).select("name email role createdAt");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ user });
});

export default router;
