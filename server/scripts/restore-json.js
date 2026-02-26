import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bin_aziz";

async function restore() {
  const backupPath = process.argv[2];

  if (!backupPath) {
    throw new Error("Please pass backup file path: npm run restore:json -- backups/<file>.json");
  }

  const raw = await fs.readFile(path.resolve(process.cwd(), backupPath), "utf8");
  const parsed = JSON.parse(raw);

  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const entries = Object.entries(parsed.collections || {});

  for (const [collectionName, docs] of entries) {
    const collection = db.collection(collectionName);
    await collection.deleteMany({});
    if (Array.isArray(docs) && docs.length > 0) {
      await collection.insertMany(docs);
    }
  }

  await mongoose.disconnect();
  console.log("Restore completed");
}

restore().catch(async (error) => {
  console.error("Restore failed", error);
  await mongoose.disconnect();
  process.exit(1);
});
