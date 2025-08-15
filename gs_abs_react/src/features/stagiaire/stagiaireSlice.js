import { createSlice } from "@reduxjs/toolkit";

const stagiaireSlice = createSlice({
    name : "stagiaire",
    initialState,
    extraReducers : (builder) => {
        builder.addCase()
    }
})

export default stagiaireSlice.reducer;