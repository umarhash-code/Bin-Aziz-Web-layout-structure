export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

const TOKEN_KEY = "binazizToken";
const USER_KEY = "binazizUser";

export function saveSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    clearSession();
    return null;
  }
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === "admin";
}
