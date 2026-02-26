import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getBlogs));
router.get("/:id", asyncHandler(getBlogById));
router.post("/", requireAuth, requireAdmin, asyncHandler(createBlog));
router.put("/:id", requireAuth, requireAdmin, asyncHandler(updateBlog));
router.delete("/:id", requireAuth, requireAdmin, asyncHandler(deleteBlog));

export default router;
