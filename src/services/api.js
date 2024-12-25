import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'accept': 'application/json',
    },
});

const getContentType = (url) => {
    if (url === '/api/login') {
        return 'application/x-www-form-urlencoded';
    }
    return 'application/json';
};

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = getContentType(config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: async (username, password) => {
        const response = await api.post('/api/login', new URLSearchParams({
            username,
            password,
            grant_type: 'password'
        }));
        return response;
    },
    register: async (username, password, full_name) => {
        const response = await api.post('/api/register', {
            username,
            password,
            full_name,
        });
        return response;
    },
    getMe: () =>
        api.get('/api/me'),
};

export const urlAPI = {
    createURL: (url) =>
        api.post('/api/me/urls', {url: url.url}),
    getMyURLs: (page = 1) =>
        api.get(`/api/me/urls?page=${page}`),
    getURLStats: (shortCode) =>
        api.get(`/api/me/links/${shortCode}/redirects`),
};

export default api;