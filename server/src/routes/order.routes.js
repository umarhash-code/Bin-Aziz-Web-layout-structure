import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { buyCourse, getMyOrders, getPurchasedCourses } from "../controllers/order.controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.use(requireAuth);

router.post("/", asyncHandler(buyCourse));
router.get("/", asyncHandler(getMyOrders));
router.get("/purchased-courses", asyncHandler(getPurchasedCourses));

export default router;
