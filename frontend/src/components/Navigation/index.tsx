import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { RootState } from '../../store/types';

// import logo from './images/logo.png';
import SearchBar from './SearchBar/SearchBar';

interface NavigationProps {
    isLoaded: boolean;
}

function Navigation ({ isLoaded }: NavigationProps) {
    const sessionUser = useSelector((state: RootState) => state.session.user);
    const navigate = useNavigate();

    return (
        <div className='nav'>
            <div className='nav-img-container' onClick={() => navigate('/')}>
                <img
                    src={'./images/logo.png'}
                    alt='#'
                    className='navLogo'
                ></img>
            </div>
            <SearchBar />
            <ul className='navDrop'>
                {isLoaded && (
                    <>
                        <li>
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/all-questions/'>Questions</NavLink>
                        </li>
                    </>
                )}
                {isLoaded && (
                    <li>
                        <ProfileButton
                            user={{
                                ...sessionUser,
                                username: sessionUser.name,
                            }}
                        />
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Navigation;
