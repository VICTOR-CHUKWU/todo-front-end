import axios from "axios";
import { getToken } from "../utils";

const token = getToken()

axios.interceptors.response.use(
    function (successRes) {
        console.log(successRes, 'reso');

        if (successRes.data.status === 401 && successRes.data.message === 'Please login to continue') {
            localStorage.clear();
            window.location.href = '/login';
        }
        return successRes;
    },
    function (error) {
        console.log(error, 'poeror');

        if (error.response?.status === 401) {
            localStorage.clear()
            window.location.href = '/login';
            return Promise.reject(error);
        }
        if (error.request) {
            return Promise.reject(error);
        } else {
            return Promise.reject(error);
        }
    }
);

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`
    },
});

export default api;