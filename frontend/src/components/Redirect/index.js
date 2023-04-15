import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Redirect.css';
import { useSelector } from 'react-redux';

const Redirect = () => {
    const [redirectTimer, setRedirectTimer] = useState(5);
    const navigate = useNavigate();
    const redirectMessage = useSelector(
        (state) => state.session.redirectMessage
    );

    useEffect(() => {
        const startTime = Date.now();

        const redirectInterval = setInterval(() => {
            setRedirectTimer(Math.ceil((startTime + 5000 - Date.now()) / 1000));
        }, 1000);

        const redirectTimeout = setTimeout(() => {
            navigate('/login');
        }, 5000);

        return () => {
            clearInterval(redirectInterval);
            clearTimeout(redirectTimeout);
        };
    }, []);

    return (
        <div className="ask-question-page-container">
            <h1>
                You must be logged in to{' '}
                {redirectMessage ?? 'perform this action.'}
            </h1>
            <h2 className="redirect-timer-message">Redirecting you...</h2>

            <div className="spinner">
                <div className="inner-spinner"></div>
                <span>{redirectTimer}</span>
            </div>

            <button
                className="button redirect-button"
                onClick={() => {
                    navigate('/login');
                }}
            >
                Click here if you're pressed for time.
            </button>
        </div>
    );
};

export default Redirect;
