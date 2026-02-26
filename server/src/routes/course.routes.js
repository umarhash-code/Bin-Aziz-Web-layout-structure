import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse,
} from "../controllers/course.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getCourses));
router.get("/:id", asyncHandler(getCourseById));
router.post("/", requireAuth, requireAdmin, asyncHandler(createCourse));
router.put("/:id", requireAuth, requireAdmin, asyncHandler(updateCourse));
router.delete("/:id", requireAuth, requireAdmin, asyncHandler(deleteCourse));

export default router;
