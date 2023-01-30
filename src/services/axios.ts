import axios from "axios";
import { getToken } from "../utils";

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers["x-access-token"] = token
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

api.interceptors.response.use(data => data, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('todo-token');
        window.location.href = '/login';
    }
    throw error;
});
export default api;