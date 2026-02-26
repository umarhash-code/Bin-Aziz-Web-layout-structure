import { Router } from "express";
import { getAllUsers, deleteUser } from "../controllers/user.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get("/", asyncHandler(getAllUsers));
router.delete("/:id", asyncHandler(deleteUser));

export default router;
