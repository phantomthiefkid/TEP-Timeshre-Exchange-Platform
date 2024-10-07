import axios from "axios";

// Tạo một instance axios với baseURL
const instance = axios.create({
    baseURL: "http://35.247.160.131/api/",
});

// Sử dụng interceptor để thêm token vào header cho mỗi request
instance.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage (nếu tồn tại)
        const token = localStorage.getItem("token");

        // Nếu có token, thêm nó vào header Authorization dưới dạng Bearer Token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Xử lý lỗi trước khi request được gửi
        return Promise.reject(error);
    }
);

export default instance;
