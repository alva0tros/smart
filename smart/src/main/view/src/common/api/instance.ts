import axios, { Axios } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const createApiInstance = (config: any): Axios => {
    const instance = axios.create(config);

    instance.interceptors.response.use(
        (response) => response,
        (error) => error.response
    );

    return instance;
};

const api: Axios = createApiInstance({
    baseURL: BASE_URL,
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const authApi: Axios = createApiInstance({
    baseURL: BASE_URL,
    timeout: 3000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
});

export { api, authApi };
