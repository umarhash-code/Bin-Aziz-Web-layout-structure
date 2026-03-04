import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./config/env.js";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";

export function createApp() {
  const app = express();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const frontendDist = path.resolve(__dirname, "../../my-website/dist");
  const frontendIndex = path.join(frontendDist, "index.html");

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          return callback(null, true);
        }

        if (env.corsOrigins.length === 0 || env.corsOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("CORS origin not allowed"));
      },
      credentials: true,
    })
  );
  app.use(express.json({ limit: "2mb" }));
  app.use(morgan("dev"));

  app.use("/api", healthRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/blogs", blogRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);

  if (fs.existsSync(frontendIndex)) {
    app.use(express.static(frontendDist));
    app.get(/^\/(?!api(?:\/|$)).*/, (_req, res) => {
      res.sendFile(frontendIndex);
    });
  }

  app.use((err, _req, res, _next) => {
    const message = err?.message || "Internal server error";
    return res.status(500).json({ message });
  });

  return app;
}
