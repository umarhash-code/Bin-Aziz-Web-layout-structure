import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bin_aziz";

async function backup() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();

  const snapshot = {
    createdAt: new Date().toISOString(),
    database: db.databaseName,
    collections: {},
  };

  for (const collection of collections) {
    const docs = await db.collection(collection.name).find({}).toArray();
    snapshot.collections[collection.name] = docs;
  }

  const backupDir = path.resolve(process.cwd(), "backups");
  await fs.mkdir(backupDir, { recursive: true });

  const fileName = `backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  const filePath = path.join(backupDir, fileName);

  await fs.writeFile(filePath, JSON.stringify(snapshot, null, 2), "utf8");
  await mongoose.disconnect();

  console.log(`Backup saved: ${filePath}`);
}

backup().catch(async (error) => {
  console.error("Backup failed", error);
  await mongoose.disconnect();
  process.exit(1);
});
