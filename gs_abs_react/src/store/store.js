import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import authSlice from '../services/authSlice';
const store = configureStore({
    reducer : {
        [authApi.reducerPath] : api.reducer,
        auth : authSlice
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware)

})

export default store;