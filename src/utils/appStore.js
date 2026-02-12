import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice"
import  userReducer  from "./userSlice";
import connectionReducer from "./connection.Slice";
import { connect } from "react-redux";
const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed:feedReducer,
        connection : connectionReducer,
    },
})
export default appStore;
