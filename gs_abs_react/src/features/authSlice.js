import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    token : null,
    isAuthenticated : false
}
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        loadUser : (state, {payload}) => {
            state.token = payload.token,
            state.user = payload.user,
            state.isAuthenticated = true
        },
        clearUser : (state) => {
            state.token = null,
            state.user = null,
            state.isAuthenticated = false
        }
    }

});

export default authSlice.reducer;
export const {loadUser, clearUser} = authSlice.actions;