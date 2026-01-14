import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const user = typeof window !== 'undefined' ? localStorage.getItem('preque_user') : null;
    if (user) {
        const { token } = JSON.parse(user);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const productAPI = {
    getAll: (params) => api.get('/products', { params }),
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
    uploadImages: (formData) => api.post('/products/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export const userAPI = {
    login: (credentials) => api.post('/users/login', credentials),
    register: (userData) => api.post('/users', userData),
    getProfile: () => api.get('/users/profile'),
    getAll: () => api.get('/users'),
    addAddress: (addressData) => api.post('/users/addresses', addressData),
    deleteAddress: (id) => api.delete(`/users/addresses/${id}`),
};

export const orderAPI = {
    create: (data) => api.post('/orders', data),
    getById: (id) => api.get(`/orders/${id}`),
    getMyOrders: () => api.get('/orders/myorders'),
    getAll: () => api.get('/orders'),
    deliver: (id) => api.put(`/orders/${id}/deliver`),
    verify: (data) => api.post('/orders/verify', data),
};

export const couponAPI = {
    validate: (code) => api.post('/coupons/validate', { code }),
};

// Update productAPI to include reviews
const originalProductAPI = { ...productAPI };
productAPI.createReview = (id, reviewData) => api.post(`/products/${id}/reviews`, reviewData);

export default api;
