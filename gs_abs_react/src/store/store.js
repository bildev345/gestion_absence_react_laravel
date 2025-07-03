import { configureStore } from "@reduxjs/toolkit";
import slice from '../features/auth/authSlice';
import { injectStore } from "../api/client";

const store = configureStore({
    reducer : {
        auth : slice
    }
})

injectStore(store);

export default store;