import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../store/session';
import { clearQuestionVotes } from '../../store/questionVotes';
import { clearAnswerVotes } from '../../store/answerVotes';

interface User {
    username: string;
    email: string;
}

function ProfileButton ({ user }: { user: User | null }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef<HTMLUListElement | null>(null);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e: any) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const handleLogout = (e: any) => {
        e.preventDefault();

        dispatch(logout());
        dispatch(clearQuestionVotes());
        dispatch(clearAnswerVotes());
        // added
        closeMenu();
        navigate('/');
    };

    const closeMenu = () => setShowMenu(false);
    const demoUserLogin = () => {
        const credential = {
            email: 'demo@aa.io',
            password: 'password',
        };
        dispatch(login(credential));
        closeMenu();
    };

    const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

    return (
        <>
            <button onClick={openMenu} className='modalButton'>
                <i className='fas fa-user-circle' />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        <li>
                            <NavLink onClick={closeMenu} to='/user/profile'>
                                Profile
                            </NavLink>
                        </li>
                        <li className='button-container'>
                            <button
                                className='modalButton'
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className='button-container'>
                            <OpenModalButton
                                buttonText='Log In'
                                // onItemClick={closeMenu}
                                onModalClose={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>

                        <li className='button-container'>
                            <OpenModalButton
                                buttonText='Sign Up'
                                // onItemClick={closeMenu}
                                onModalClose={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>

                        <li className='button-container'>
                            <button
                                className='modalButton'
                                onClick={demoUserLogin}
                            >
                                DemoUser
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
