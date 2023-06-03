import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import store from './store';
import '../public/index.css';
import App from './app';
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>  
  </Provider>
);