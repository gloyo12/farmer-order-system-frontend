import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, 
});

export const createOrder = (order) => api.post('/orders', order);
export const getOrders = () => api.get('/orders');
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}`, { status });

export const addFertilizer = (data) => api.post(`/fertilizers/`, data);
export const getAllFertilizers = () => api.get(`/fertilizers/`).then(res => res.data);
export const deleteFertilizer = (id) => api.delete(`/fertilizers/${id}`);


export const addSeed = (data) => api.post(`/seeds/`, data);
export const getAllSeeds = () => api.get(`/seeds/`).then(res => res.data);
export const deleteSeed = (id) => api.delete(`/seeds/${id}`);


export const login = (credentials) => api.post('/auth/login', credentials);
export const logout = () => api.post('/auth/logout');
