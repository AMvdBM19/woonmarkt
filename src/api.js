const API_URL = "/api";

const getToken = () => localStorage.getItem("token");

const headers = () => {
  const token = getToken();
  const h = { "Content-Type": "application/json" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

export const getHouses = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.location) query.append("location", params.location);
  if (params.type) query.append("type", params.type);

  const res = await fetch(`${API_URL}/houses?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch houses");
  return res.json();
};

export const getHouse = async (id) => {
  const res = await fetch(`${API_URL}/houses/${id}`);
  if (!res.ok) throw new Error("House not found");
  return res.json();
};

export const createHouse = async (houseData, imageFile) => {
  const formData = new FormData();
  formData.append("title", houseData.title);
  formData.append("description", houseData.description);
  formData.append("type", houseData.type);
  formData.append("price", houseData.price);
  formData.append("location", houseData.location);
  if (imageFile) formData.append("image", imageFile);

  const token = getToken();
  const res = await fetch(`${API_URL}/houses`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create house");
  return data;
};

export const updateHouse = async (id, houseData, imageFile) => {
  const formData = new FormData();
  formData.append("title", houseData.title);
  formData.append("description", houseData.description);
  formData.append("type", houseData.type);
  formData.append("price", houseData.price);
  formData.append("location", houseData.location);
  if (imageFile) formData.append("image", imageFile);

  const token = getToken();
  const res = await fetch(`${API_URL}/houses/${id}`, {
    method: "PUT",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update house");
  return data;
};

export const deleteHouse = async (id) => {
  const res = await fetch(`${API_URL}/houses/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete house");
  return data;
};

export const improveDescription = async (description) => {
  const res = await fetch(`${API_URL}/ai/improve-description`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ description }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "AI improvement failed");
  return data;
};

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

export const register = async (name, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};

export const setAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const aiSearch = async (query) => {
  const res = await fetch(`${API_URL}/ai/search`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "AI search failed");
  return data;
};
