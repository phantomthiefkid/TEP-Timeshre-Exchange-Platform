import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    role: "",
    isLogin: false,
    isLoading: false,
    isError: false,
    userId: null
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setRoleName: (state, action) => {
            state.role = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.isError = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        }
    }
});

export const { setIsLogin, setRoleName, setError, setIsLoading, setUserId } = loginSlice.actions;
export default loginSlice.reducer;
