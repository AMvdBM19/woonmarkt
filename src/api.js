export const getHouses = async () => {
  return [
    {
      _id: "1",
      title: "Modern Apartment",
      location: "Amsterdam",
      price: 1200,
      type: "rent",
      description: "Nice apartment",
    },
    {
      _id: "2",
      title: "Family House",
      location: "Rotterdam",
      price: 2000,
      type: "sale",
      description: "Big house",
    },
  ];
};

export const getHouse = async (id) => {
  return {
    _id: id,
    title: "Modern Apartment",
    location: "Amsterdam",
    price: 1200,
    type: "rent",
    description: "Nice apartment",
    owner: { _id: "1", name: "User", email: "test@test.com" },
  };
};

export const createHouse = async () => ({ _id: "1" });
export const updateHouse = async () => ({});
export const deleteHouse = async () => ({});
export const improveDescription = async () => ({
  improvedDescription: "Improved description by AI",
});

export const login = async () => ({
  token: "123",
  user: { _id: "1", name: "User" },
});

export const register = login;

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

export const isLoggedIn = () => true;