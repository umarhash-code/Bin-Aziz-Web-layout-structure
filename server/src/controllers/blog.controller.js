import { Blog } from "../models/Blog.js";

export async function getBlogs(_req, res) {
  const blogs = await Blog.find().populate("author", "name email").sort({ createdAt: -1 }).lean();
  return res.json({ blogs });
}

export async function getBlogById(req, res) {
  const blog = await Blog.findById(req.params.id).populate("author", "name email").lean();

  if (!blog) {
    return res.status(404).json({ message: "blog not found" });
  }

  return res.json({ blog });
}

export async function createBlog(req, res) {
  const { title, content, image } = req.body || {};

  if (!title || !content) {
    return res.status(400).json({ message: "title and content are required" });
  }

  const blog = await Blog.create({
    title: String(title).trim(),
    content: String(content),
    image: image ? String(image) : "",
    author: req.user.id,
  });

  return res.status(201).json({ blog });
}

export async function updateBlog(req, res) {
  const payload = { ...req.body };
  delete payload.author;

  const blog = await Blog.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });

  if (!blog) {
    return res.status(404).json({ message: "blog not found" });
  }

  return res.json({ blog });
}

export async function deleteBlog(req, res) {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "blog not found" });
  }

  return res.json({ message: "blog deleted" });
}
