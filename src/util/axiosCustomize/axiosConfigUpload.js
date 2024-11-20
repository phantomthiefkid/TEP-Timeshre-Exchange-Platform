import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "https://unwind.id.vn/"
    // baseURL: "http://35.247.160.131/",
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
