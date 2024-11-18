import axios from "axios";

const instance = axios.create({
  baseURL: "http://35.247.160.131/api/",
  // baseURL: "https://fams-management.tech/api/",
});

instance.interceptors.request.use(
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

export default instance;
