import { configureStore } from "@reduxjs/toolkit";
import yourReducer from '../components/yourReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware } from 'redux';

const store = configureStore(
  yourReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;