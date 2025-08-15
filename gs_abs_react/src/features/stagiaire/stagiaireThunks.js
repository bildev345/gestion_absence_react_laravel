import { createAsyncThunk } from "@reduxjs/toolkit";

const importStagiares = createAsyncThunk('importStagiaire', async({payload}) => {
    const response = await fetch('/api/stagiaires/import', {
        method : "POST",
        headers : {
            'Authorization' : `Bearer ${localStorage.getItem('token')}`,
        },
        body : payload
    });
    return 
    
})