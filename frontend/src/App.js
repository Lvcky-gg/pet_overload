import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        console.log('isLoaded:', isLoaded);
    });

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Routes>
                    <Route path="/login" component={LoginFormPage} />
                    <Route path="/signup" component={SignupFormPage} />
                </Routes>
            )}
        </>
    );
}

export default App;
