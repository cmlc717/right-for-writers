import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllPosts = createAsyncThunk("Posts/getAll", async() => {
    try {
        const response = await axios.get('apiRoutes/posts');
        return response;
    } catch (err) {
        console.error(err)
    }
});

export const AllPostsSlice = createSlice({
    name: "AllPosts",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const selectAllPosts = (state) => {
    return state.AllPosts;
}

export default AllPostsSlice.reducer;