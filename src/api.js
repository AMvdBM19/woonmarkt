const API = "http://localhost:3001/api";

function getToken() {
  return localStorage.getItem("token");
}

function setAuth(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
}

function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function getUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

function isLoggedIn() {
  return !!getToken();
}

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

// Auth
export const login = (email, password) =>
  request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });

export const register = (name, email, password) =>
  request("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });

// Houses
export const getHouses = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/houses${query ? `?${query}` : ""}`);
};

export const getHouse = (id) => request(`/houses/${id}`);

export const createHouse = (house) =>
  request("/houses", { method: "POST", body: JSON.stringify(house) });

export const updateHouse = (id, house) =>
  request(`/houses/${id}`, { method: "PUT", body: JSON.stringify(house) });

export const deleteHouse = (id) =>
  request(`/houses/${id}`, { method: "DELETE" });

// AI
export const improveDescription = (description) =>
  request("/ai/improve-description", { method: "POST", body: JSON.stringify({ description }) });

export { setAuth, clearAuth, getUser, isLoggedIn };
