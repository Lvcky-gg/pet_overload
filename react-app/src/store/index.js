import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import sessionReducer from './session';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middleware.push(logger);
}

const store = configureStore({
    reducer: {
        session: sessionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
    devTools: process.env.NODE_ENV !== 'production',
    // enhancers: [
    // 	process.env.NODE_ENV !== "production"
    // 		? composeWithDevTools()
    // 		: (f) => f,
    // ],
});

export default store;
