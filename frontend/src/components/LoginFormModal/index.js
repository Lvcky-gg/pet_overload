import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { useModal } from '../../context/Modal';
import './LoginForm.css';
import logo from './favicon2_720.png';

function LoginFormModal() {
    const dispatch = useDispatch();
    // const loading = useSelector((state) => state.session.loading);
    const user = useSelector((state) => state.session.user);
    const validationErrors = useSelector(
        (state) => state.session.validationErrors
    );
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
        <div className="modalLogin">
            <img src={logo} alt="#" className="modalLogo"></img>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} className="login-form">
                {/* {error && <div>{error}</div>} */}
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <ul className="modal-form-list-err">
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
                <div>
                    <button type="submit" className="modalButton">
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginFormModal;
