import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "bin-aziz-server",
    mongoConnected: mongoose.connection.readyState === 1,
  });
});

router.get("/health/db", async (_req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;

    if (!isConnected || !mongoose.connection.db) {
      return res.status(503).json({
        ok: false,
        mongoConnected: false,
        message: "MongoDB is not connected",
      });
    }

    await mongoose.connection.db.admin().ping();

    return res.json({
      ok: true,
      mongoConnected: true,
      message: "MongoDB ping successful",
    });
  } catch (_error) {
    return res.status(503).json({
      ok: false,
      mongoConnected: false,
      message: "MongoDB ping failed",
    });
  }
});

export default router;
