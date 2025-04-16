import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { signUp, clearErrors } from '../../store/session';
import validateInput from '../../utils/validateInput';

import './SignupForm.css';

function SignupFormModal () {
    const dispatch = useDispatch();
    const user = useSelector(
        (state: { session: { user: any } }) => state.session.user
    );
    const validationErrors = useSelector(
        (state: { session: { validationErrors: string[] } }) =>
            state.session.validationErrors
    );
    const [errors, setErrors] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const modalContext = useModal();
    const closeModal = modalContext?.closeModal;
    const setOnModalClose = modalContext?.setOnModalClose;
    const [inputValidate, setInputValidate] = useState<string[]>([]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const errors = validateInput({
            username,
            email,
            password,
            confirmPassword,
        });
        if (errors.length) {
            setInputValidate(errors);
        } else {
            dispatch(signUp({ username, email, password }));
        }
    };

    useEffect(() => {
        // Signup was successful?
        if (user) {
            closeModal?.();
            setErrors('');
        } // clean errors if modal closed
        const clearErrorMessages = () => {
            dispatch(clearErrors());
        };
        if (setOnModalClose) {
            setOnModalClose(clearErrorMessages);
        }
    }, [user, closeModal, dispatch, setOnModalClose]);

    let errorObject: string[] = [];
    if (validationErrors) {
        errorObject = Object.values(
            validationErrors.reduce((acc: Record<string, string>, error) => {
                const [key, value] = error.split(' : ');
                acc[key] = value;
                return acc;
            }, {} as Record<string, string>)
        );
    }

    if (errors) errorObject.push(errors);

    return (
        <div className='modalSignUp'>
            <img src={'./favicon2_720.png'} alt='#' className='modalLogo'></img>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // required
                    />
                </div>
                <div>
                    <label>Username</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        // required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // required
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        // required
                    />
                </div>
                <ul className='modal-form-list-err'>
                    {inputValidate &&
                        inputValidate.map((error, idx) => (
                            <li key={idx}>
                                <span style={{ color: 'red', padding: '5px' }}>
                                    <i className='fas fa-exclamation-circle'></i>
                                </span>
                                {error}
                            </li>
                        ))}
                    {errorObject &&
                        errorObject.map((error, idx) => (
                            <li key={idx}>
                                <span style={{ color: 'red', padding: '5px' }}>
                                    <i className='fas fa-exclamation-circle'></i>
                                </span>
                                {error}
                            </li>
                        ))}
                </ul>
                <div>
                    <button type='submit' className='modalButton'>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignupFormModal;
