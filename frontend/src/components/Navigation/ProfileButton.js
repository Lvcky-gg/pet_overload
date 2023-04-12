import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from 'react-router-dom';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button onClick={openMenu} className="modalButton">
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        {/* home question user link in the side bar  */}
                        {/* <li><NavLink to='/'>Home</NavLink></li> */}

                        {/* <li>
                            <NavLink to="/all-questions/">Questions</NavLink>
                        </li> */}
                        {/* <li>
                            <NavLink to="/all-users">Users</NavLink>
                        </li> */}
                        {/* we can have it when the backend is ready for it */}
                        {/* <li>
                            <NavLink to="/team">Our Team</NavLink>
                        </li> */}
                        <NavLink exact="true" to="/user/profile">
                            Profile
                        </NavLink>
                        <li>
                            <button
                                className="modalButton"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <OpenModalButton
                            buttonText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />

                        <OpenModalButton
                            buttonText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
