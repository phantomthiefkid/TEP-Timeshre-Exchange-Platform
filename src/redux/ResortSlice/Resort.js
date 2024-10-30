import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    resortId: null
}

const resortSlice =  createSlice({
    name: "resort",
    initialState,
    reducers: {
        setResortId: (state, action) => {
            state.resortId = action.payload;
            console.log("Redux: ", action.payload)
        }
    }
})
export const { setResortId } = resortSlice.actions;
export default resortSlice.reducer;