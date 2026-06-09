import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bin_aziz";
const adminEmail = (process.env.ADMIN_EMAIL || "admin@binaziz.com").trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
const adminName = process.env.ADMIN_NAME || "Admin";

async function run() {
  await mongoose.connect(mongoUri);
  const users = mongoose.connection.collection("users");
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const result = await users.updateOne(
    { email: adminEmail },
    { $set: { password: passwordHash, role: "admin", name: adminName } },
    { upsert: true }
  );

  console.log(
    JSON.stringify({
      email: adminEmail,
      matched: result.matchedCount,
      modified: result.modifiedCount,
      upserted: result.upsertedCount,
    })
  );

  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error(error);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
