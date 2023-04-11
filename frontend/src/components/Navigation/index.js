import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './images/logo.png';
import SearchBar from './SearchBar/SearchBar';
function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className="nav">
            <img src={logo} alt="#" className="navLogo"></img>
            <SearchBar />
            <ul className="navDrop">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                {isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Navigation;
