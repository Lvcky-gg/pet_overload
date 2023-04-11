import { configureStore } from '@reduxjs/toolkit';
import { loadingMiddleware } from './loader';
import loadingReducer from './loader';
import sessionReducer from './session';
import questionsReducer from './questions';
import answerReducer from './answers';
import userReducer from './users';
import questionVotesReducer from './questionVotes';
import answerVotesReducer from './answerVotes';

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
        answers: answerReducer,
        users: userReducer,
        questionVotes: questionVotesReducer,
        answerVotes: answerVotesReducer,
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
