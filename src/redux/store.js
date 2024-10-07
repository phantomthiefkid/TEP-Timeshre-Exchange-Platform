import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './UserSlice/SignIn'

export default configureStore({
    reducer: {
        isLogin: loginSlice
    }
})

