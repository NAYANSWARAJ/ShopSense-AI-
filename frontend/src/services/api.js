import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

export const predictShoppingIntention = async (payload) => {
  const response = await api.post("/predict", payload);
  return response.data;
};

export const getHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};

export default api;