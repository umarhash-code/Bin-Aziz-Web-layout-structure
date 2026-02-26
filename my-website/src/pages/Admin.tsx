import { useEffect, useState, type FC, type FormEvent } from "react";
import { api } from "../lib/api";
import { isAdmin } from "../lib/auth";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
};

const Admin: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    duration: "",
    level: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    price: "",
    category: "",
  });
  const [postForm, setPostForm] = useState({ title: "", excerpt: "", content: "", tags: "" });

  const loadUsers = async () => {
    try {
      const response = await api.adminUsers();
      setUsers(response.users);
    } catch (loadError) {
      const msg = loadError instanceof Error ? loadError.message : "Failed to load users";
      setError(msg);
    }
  };

  useEffect(() => {
    if (isAdmin()) {
      void loadUsers();
    }
  }, []);

  if (!isAdmin()) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <h1>Admin Access Required</h1>
          <p>Please login with admin account to manage courses, blog, and users.</p>
        </div>
      </section>
    );
  }

  const onCourseSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.adminCreateCourse({
        ...courseForm,
        price: Number(courseForm.price),
      });
      setCourseForm({ title: "", description: "", duration: "", level: "Beginner", price: "", category: "" });
      setMessage("Course uploaded successfully");
    } catch (submitError) {
      const msg = submitError instanceof Error ? submitError.message : "Failed to upload course";
      setError(msg);
    }
  };

  const onPostSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.adminCreatePost({
        title: postForm.title,
        excerpt: postForm.excerpt,
        content: postForm.content,
        tags: postForm.tags.split(",").map((value) => value.trim()).filter(Boolean),
      });
      setPostForm({ title: "", excerpt: "", content: "", tags: "" });
      setMessage("Blog uploaded successfully");
    } catch (submitError) {
      const msg = submitError instanceof Error ? submitError.message : "Failed to upload blog";
      setError(msg);
    }
  };

  const toggleUser = async (user: User) => {
    setError("");
    setMessage("");
    try {
      await api.adminUpdateUser(user._id, { isActive: !user.isActive });
      setMessage("User updated");
      await loadUsers();
    } catch (toggleError) {
      const msg = toggleError instanceof Error ? toggleError.message : "Failed to update user";
      setError(msg);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-grid">
        <form className="auth-card auth-form" onSubmit={onCourseSubmit}>
          <h2>Upload Course</h2>
          <input placeholder="Title" value={courseForm.title} onChange={(event) => setCourseForm({ ...courseForm, title: event.target.value })} required />
          <textarea placeholder="Description" value={courseForm.description} onChange={(event) => setCourseForm({ ...courseForm, description: event.target.value })} required />
          <input placeholder="Duration (e.g. 8 Weeks)" value={courseForm.duration} onChange={(event) => setCourseForm({ ...courseForm, duration: event.target.value })} required />
          <select value={courseForm.level} onChange={(event) => setCourseForm({ ...courseForm, level: event.target.value as "Beginner" | "Intermediate" | "Advanced" })}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <input placeholder="Price" type="number" min={0} value={courseForm.price} onChange={(event) => setCourseForm({ ...courseForm, price: event.target.value })} required />
          <input placeholder="Category" value={courseForm.category} onChange={(event) => setCourseForm({ ...courseForm, category: event.target.value })} required />
          <button type="submit" className="enroll-btn">Upload Course</button>
        </form>

        <form className="auth-card auth-form" onSubmit={onPostSubmit}>
          <h2>Upload Blog</h2>
          <input placeholder="Title" value={postForm.title} onChange={(event) => setPostForm({ ...postForm, title: event.target.value })} required />
          <textarea placeholder="Excerpt" value={postForm.excerpt} onChange={(event) => setPostForm({ ...postForm, excerpt: event.target.value })} required />
          <textarea placeholder="Content" value={postForm.content} onChange={(event) => setPostForm({ ...postForm, content: event.target.value })} required />
          <input placeholder="Tags comma separated" value={postForm.tags} onChange={(event) => setPostForm({ ...postForm, tags: event.target.value })} />
          <button type="submit" className="enroll-btn">Upload Blog</button>
        </form>
      </div>

      <div className="auth-card admin-users">
        <h2>Manage Users</h2>
        {error ? <p className="auth-error">{error}</p> : null}
        {message ? <p className="auth-success">{message}</p> : null}
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <div>
                <strong>{user.name}</strong>
                <p>{user.email} · {user.role} · {user.isActive ? "active" : "disabled"}</p>
              </div>
              <button type="button" className="enroll-btn" onClick={() => void toggleUser(user)}>
                {user.isActive ? "Disable" : "Enable"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Admin;
