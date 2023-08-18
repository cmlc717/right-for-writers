import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import LoginSlice from "../components/authform/LoginSlice";
import SignupSlice from "../components/authform/SignupSlice";
import LandingSlice from "../components/landing/LandingSlice";
import logger from 'redux-logger';
const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: {
    Login: LoginSlice,
    Signup: SignupSlice,
    Landing: LandingSlice
  },   
  middleware: middleware,
});

export default store;