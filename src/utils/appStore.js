import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice"
import  userReducer  from "./userSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./Requestconnections"
import { connect } from "react-redux";
const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed:feedReducer,
        connection : connectionReducer,
        request : requestReducer,
    },
})
export default appStore;
