import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import { HomePage } from './components/HomePage';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import { Footer } from './components/footer';

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
                    <Route path='/'  element={<HomePage/>}/>
                </Routes>
         
            )}
            <Footer></Footer>
        </>
    );
}

export default App;
