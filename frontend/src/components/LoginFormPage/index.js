import React, { useState } from 'react';
import { login } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './LoginForm.css';
import validateInput from '../../utils/validateInput';
import { clearErrors } from '../../store/session';
import { useEffect } from 'react';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const validationErrors = useSelector(
        (state) => state.session.validationErrors
    );
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputValidate, setInputValidate] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateInput({ email, password });
        if (errors.length) {
            setInputValidate(errors);
        } else {
            setInputValidate([]);
            dispatch(login({ email, password }));
        }
    };

    useEffect(() => {
        // Login successful?
        if (sessionUser) {
            return <Navigate to="/" />;
        }
        // clean errors if modal closed
        const clearErrorMessages = () => {
            dispatch(clearErrors());
        };

        return () => clearErrorMessages();
    }, [sessionUser, dispatch]);

    if (sessionUser) return <Navigate to="/" />;
    let errorObject = [];
    if (validationErrors) {
        errorObject = Object.values(
            validationErrors.reduce((acc, error) => {
                const [key, value] = error.split(' : ');
                acc[key] = value;
                return acc;
            }, {})
        );
    }

    return (
        <div className="loginPage">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="handleLoginBox">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="handleLoginBox">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="handleLoginBox">
                    <button type="submit" className="modalButton">
                        Log In
                    </button>
                </div>
            </form>
            <ul className="modal-form-list-err">
                {inputValidate &&
                    inputValidate.map((error, idx) => (
                        <li key={idx}>
                            <span style={{ color: 'red', padding: '5px' }}>
                                <i className="fas fa-exclamation-circle"></i>
                            </span>
                            {error}
                        </li>
                    ))}
                {errorObject &&
                    errorObject.map((error, idx) => (
                        <li key={idx}>
                            <span style={{ color: 'red', padding: '5px' }}>
                                <i className="fas fa-exclamation-circle"></i>
                            </span>
                            {error}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default LoginFormPage;
