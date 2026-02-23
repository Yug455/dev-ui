import { createSlice } from "@reduxjs/toolkit";
const requestSlice = createSlice({
    name : "request",
    initialState : null,
    reducers:{
        addRequest : (state,action)=>{
           return action.payload
        },
        removerequest : (state,action)=>{
            const newArray = state.filter(r => r._id !== action.payload)
            return newArray;
        }
    },

})
export const {addRequest,removerequest} = requestSlice.actions
export default requestSlice.reducer