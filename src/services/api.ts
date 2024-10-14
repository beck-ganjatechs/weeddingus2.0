import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_POKETBASE_URL,
});

api.interceptors.request.use((config) => {
  config.auth = {
    username: import.meta.env.VITE_POKETBASE_USERNAME,
    password: import.meta.env.VITE_POKETBASE_PASSWORD,
  };
  return config;
});

export const getProducts = async () => {
  const response = await api.get('collections/productsCollection/records');
  return response.data.items;
};

export const createProduct = async (product) => {
  const response = await api.post('collections/productsCollection/records', product);
  return response.data;
};

export const getInventory = async () => {
  const response = await api.get('collections/inventoryCollection/records');
  return response.data.items;
};

export const updateInventory = async (id, quantity) => {
  const response = await api.patch(`collections/inventoryCollection/records/${id}`, { quantity });
  return response.data;
};

export default api;