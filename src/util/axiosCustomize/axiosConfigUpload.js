import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "https://fams-management.tech/",
});

axiosConfig.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosConfig;
