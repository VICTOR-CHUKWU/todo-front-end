import axios from "axios";
import { getToken } from "../utils";

const token = getToken()

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`
    },
});

api.interceptors.response.use(data => data, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('todo-token');
        window.location.href = '/login';
    }
    throw error;
});
export default api;