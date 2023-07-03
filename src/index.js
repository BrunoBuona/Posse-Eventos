// React | React Navigator
import React from 'react';
import "./i18n.js";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

// Enrutador
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

// Redux
import {Provider} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers/rootReducer";
const store = configureStore({reducer:rootReducer})

// Dont modify anything of this :)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)
