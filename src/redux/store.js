import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './UserSlice/SignIn'
import resortSlice from './ResortSlice/Resort'
export default configureStore({
    reducer: {
        isLogin: loginSlice,
        resortId: resortSlice
    }
})

