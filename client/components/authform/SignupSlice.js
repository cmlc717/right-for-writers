import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSignupAsync = createAsyncThunk("User/createOne", async({username, password}) => {
    try {
        const response = await axios.post('apiRoutes/signup', {username, password});
        const { token } = response.data;
        localStorage.setItem('token', token);
        return token;
    } catch (err) {
        console.err(err);
    }
});

export const SignupSlice = createSlice({
    name: "Signup",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSignupAsync.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const selectSignup = (state) => {
    return state.Signup;
}

export default SignupSlice.reducer;