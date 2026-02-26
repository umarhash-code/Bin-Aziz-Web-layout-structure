import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { createApp } from "./app.js";
import { ensureAdmin } from "./seed/ensureAdmin.js";
import { ensureSeedData } from "./seed/ensureSeedData.js";

async function bootstrap() {
  await connectDb();
  await ensureAdmin();
  await ensureSeedData();

  const app = createApp();

  app.listen(env.port, () => {
    console.log(`Server running at http://localhost:${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
