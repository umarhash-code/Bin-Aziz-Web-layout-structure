import { getToken } from "./auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  auth?: boolean;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.auth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = (await response.json().catch(() => ({}))) as { message?: string } & T;

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  signup: (payload: { name: string; email: string; password: string }) =>
    request<{ token: string; user: { id: string; name: string; email: string; role: "user" | "admin" } }>("/auth/register", {
      method: "POST",
      body: payload,
    }),
  login: (payload: { email: string; password: string }) =>
    request<{ token: string; user: { id: string; name: string; email: string; role: "user" | "admin" } }>("/auth/login", {
      method: "POST",
      body: payload,
    }),
  me: () => request<{ user: { id: string; name: string; email: string; role: "user" | "admin" } }>("/auth/me", { auth: true }),
  listCourses: () =>
    request<{ courses: Array<{ _id: string; title: string; description: string; duration: string; level: "Beginner" | "Intermediate" | "Advanced"; price: number; category: string }> }>(
      "/courses"
    ),
  listPosts: () =>
    request<{ posts: Array<{ _id: string; title: string; slug: string; excerpt: string; content: string; tags: string[]; createdAt: string }> }>(
      "/blog"
    ),
  buyCourse: (courseId: string) => request<{ order: { _id: string; itemTitle: string; amount: number } }>(`/orders/courses/${courseId}/buy`, { method: "POST", auth: true }),
  orderService: (payload: { serviceName: string; details: string; budget: number }) =>
    request<{ order: { _id: string; itemTitle: string; amount: number } }>("/orders/services/order", {
      method: "POST",
      auth: true,
      body: payload,
    }),
  myOrders: () => request<{ orders: Array<{ _id: string; itemTitle: string; amount: number; status: string; type: string; createdAt: string }> }>("/orders/my", { auth: true }),
  adminUsers: () =>
    request<{ users: Array<{ _id: string; name: string; email: string; role: "user" | "admin"; isActive: boolean }> }>("/admin/users", { auth: true }),
  adminUpdateUser: (id: string, payload: { role?: "user" | "admin"; isActive?: boolean }) =>
    request<{ user: { _id: string; role: "user" | "admin"; isActive: boolean } }>(`/admin/users/${id}`, {
      method: "PATCH",
      auth: true,
      body: payload,
    }),
  adminCreateCourse: (payload: { title: string; description: string; duration: string; level: "Beginner" | "Intermediate" | "Advanced"; price: number; category: string }) =>
    request<{ course: { _id: string } }>("/courses", { method: "POST", auth: true, body: payload }),
  adminCreatePost: (payload: { title: string; excerpt: string; content: string; tags: string[] }) =>
    request<{ post: { _id: string } }>("/blog", { method: "POST", auth: true, body: payload }),
};
