import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { signUp } from '../../store/session';
import './SignupForm.css';
import logo from './favicon2_720.png'

function SignupFormModal() {
    const dispatch = useDispatch();
    // const loading = useSelector((state) => state.session.loading);
    const user = useSelector((state) => state.session.user);
    const validationErrors = useSelector((state) => state.session.validationErrors);
    const error = useSelector((state) => state.session.error);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            dispatch(signUp({ username, email, password }));
        }
    };

    useEffect(() => {
        // Signup was successful?
        if (user) {
            closeModal();
        }
    }, [user, closeModal]);

    return (
        <div className='modalSignUp'>
            <img src={logo} alt="#" className='modalLogo'></img>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                {error && <div>{error}</div>}

                <ul>
                    {validationErrors && validationErrors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div>
                <label>
                    Email
                </label>
                <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                <label>
                    Username
                </label>
                <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                <label>
                    Password
                </label>
                <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                <label>
                    Confirm Password

                </label>
                <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                <button type="submit" className="modalButton">Sign Up</button>
                </div>
            </form>
    </div>
    );
}

export default SignupFormModal;
