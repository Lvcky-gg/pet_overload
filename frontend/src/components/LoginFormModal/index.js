import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
    const dispatch = useDispatch();
    // const loading = useSelector((state) => state.session.loading);
    const user = useSelector((state) => state.session.user);
    const validationErrors = useSelector((state) => state.session.validationErrors);
    const error = useSelector((state) => state.session.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(login({ email, password }));
    };

    useEffect(() => {
        // Login successful?
        if (user) {
            closeModal();
        }
    }, [user, closeModal]);

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                {error && <div>{error}</div>}

                <ul>
                    {validationErrors && validationErrors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Log In</button>
            </form>
        </>
    );
}

export default LoginFormModal;
