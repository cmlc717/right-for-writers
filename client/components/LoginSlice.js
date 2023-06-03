import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLoginAsync = createAsyncThunk("User/getOne", async({username, password}) => {
    try {
        const response = await axios.post('apiRoutes/login', {username, password});
        const { token } = response.data;
        localStorage.setItem('token', token);
        return token;
    } catch (err) {
        console.err(err);
    }
});

export const LoginSlice = createSlice({
    name: "Login",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLoginAsync.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const selectLogin = (state) => {
    return state.Login;
}

export default LoginSlice.reducer;