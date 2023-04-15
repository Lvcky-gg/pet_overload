import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../store/session';
import { useModal } from '../../context/Modal';
import './LoginForm.css';
import logo from './favicon2_720.png';
import validateInput from '../../utils/validateInput';

function LoginFormModal() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const validationErrors = useSelector(
        (state) => state.session.validationErrors
    );

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { closeModal, setOnModalClose } = useModal();
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
        if (user) {
            closeModal();
        }
        // clean errors if modal closed
        const clearErrorMessages = () => {
            dispatch(clearErrors());
        };
        setOnModalClose(clearErrorMessages);
    }, [user, closeModal, setOnModalClose, dispatch]);

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
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // required
                    />
                </div>
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
