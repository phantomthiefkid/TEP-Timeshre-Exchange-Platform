import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { baseURL } from "../../config/config"
export const loginAccount = createAsyncThunk(
    'user/loginAccount',
    async (userCredentials) => {
        const request = await axios.post(`${baseURL}auth/login`, userCredentials);
        const response = request.data.accessToken;
        return response;
    }
);




const initialState = {
    loading: false,
    token: localStorage.getItem('token') || null, // Lấy token từ localStorage
    roleName: localStorage.getItem('roleName') || null, // Lấy roleName từ localStorage
    error: false,
    isLogin: false // Nếu token tồn tại, nghĩa là đã login
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // login: (state, action) => {
        //     state.loading = false; // Giả định không cần thiết lập loading ở đây
        //     state.error = false; // Đặt lỗi về false khi gọi login
        //     state.token = action.payload.token; // Giả định action.payload có chứa token
        //     state.isLogin = true;

        //     const decodedToken = jwtDecode(action.payload.token);
        //     state.roleName = decodedToken.RoleName;

        //     // Lưu trữ token và roleName vào localStorage
        //     localStorage.setItem('token', action.payload.token);
        //     localStorage.setItem('roleName', decodedToken.RoleName);
        // },
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('roleName');
            state.token = null;
            state.roleName = null;
            state.isLogin = false;
            state.loading = false,
            state.error = false
        },

    },
    extraReducers: (builder) => {
        builder.addCase(loginAccount.pending, (state) => {
            state.loading = true;
        })
            .addCase(loginAccount.fulfilled, (state, action) => {
                state.token = action.payload;
                state.isLogin = true

                const decodedToken = jwtDecode(action.payload);
                state.roleName = decodedToken.RoleName;

                localStorage.setItem('token', action.payload); // Lưu token vào localStorage
                localStorage.setItem('roleName', decodedToken.RoleName); // Lưu roleName vào localStorage
            })
            .addCase(loginAccount.rejected, (state) => {
                state.error = true;
            });
    },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
