import { configureStore } from "@reduxjs/toolkit";
// import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
// import { applyMiddleware } from 'redux';
import LoginSlice from "../components/LoginSlice";
import SignupSlice from "../components/SignupSlice";

const store = configureStore({
  reducer: {
    Login: LoginSlice,
    Signup: SignupSlice
  }
});

export default store;