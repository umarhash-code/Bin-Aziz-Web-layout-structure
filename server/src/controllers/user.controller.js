import { User } from "../models/User.js";

export async function getAllUsers(_req, res) {
  const users = await User.find().select("name email role createdAt updatedAt").sort({ createdAt: -1 }).lean();
  return res.json({ users });
}

export async function deleteUser(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  return res.json({ message: "user deleted" });
}
