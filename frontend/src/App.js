import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
    faArrowUp,
    faArrowDown,
    faUpLong,
    faDownLong,
    faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import AllQuestionsPage from './components/AllQuestionsPage';
import UserProfile from './components/UserProfile';
import AllUsersPage from './components/allUsersPage';
import { HomePage } from './components/HomePage';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import Loader from './components/Loader';
import { Footer } from './components/footer';
import SearchResults from './components/SearchResults';

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    // FontAwesome icons to be installed globally.
    library.add(fas, faUpLong, faDownLong, faUserCircle);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            <Loader />
            {isLoaded && (
                <Routes>
                    <Route path="/login" element={<LoginFormPage />} />
                    <Route path="/signup" element={<SignupFormPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route
                        exact
                        path="/all-questions/"
                        element={<AllQuestionsPage />}
                    />
                    <Route
                        path="/all-questions/search"
                        element={<SearchResults />}
                    />
                    <Route
                        path="/user/profile"
                        element={<UserProfile isLoaded={isLoaded} />}
                    />
                </Routes>
            )}
            <Footer />
        </>
    );
}

export default App;
