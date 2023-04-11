import { configureStore } from '@reduxjs/toolkit';
import { loadingMiddleware } from './loader';
import loadingReducer from './loader';
import sessionReducer from './session';
import questionsReducer from './questions';
import questionVotesReducer from './questionVotes';
import answerReducer from './answers';
import userReducer from './users';

const middleware = [loadingMiddleware];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middleware.push(logger);
}

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        session: sessionReducer,
        questions: questionsReducer,
        questionVotes: questionVotesReducer,
        answers: answerReducer,
        users: userReducer,
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
