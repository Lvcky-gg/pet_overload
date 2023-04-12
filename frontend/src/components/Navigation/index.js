import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

import logo from './images/logo.png';
import SearchBar from './SearchBar/SearchBar';
//import SearchBar from '../SearchBar';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className="nav">
            <div className="nav-img-container">
                <img src={logo} alt="#" className="navLogo"></img>
            </div>
            <SearchBar />
            <ul className="navDrop">
                {/* <li>
                <NavLink to="/">Home</NavLink>
            </li> */}
                {isLoaded && (
                    <>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/all-questions/">Questions</NavLink>
                        </li>
                    </>
                )}
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
