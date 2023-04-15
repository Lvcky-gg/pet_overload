import React from 'react';
import imageOne from './images/PXL_20230129_031141829~3.jpg';
import { NavLink } from 'react-router-dom';
import author from '../../image/author.png';
import team from '../../image/team.png';
import Highlight from './Highlights';
import { useSelector } from 'react-redux';

import './Homepage.css';

export const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    return (
        <div className="homePage">
            <div className="homePageHighlights">
                <h1 id="main-title">Where pet lovers ask, learn, and share.</h1>

                <div className="homePageCards">
                    <div className="homePageCard">
                        <img
                            src={imageOne}
                            alt="#"
                            className="placeHolderImageHome"
                        />
                        <div>
                            <NavLink to="/all-questions">Forums</NavLink>
                        </div>
                    </div>

                    <div className="homePageCard">
                        <img
                            src={author}
                            alt="#"
                            className="placeHolderImageHome"
                        />
                        <div>
                            {sessionUser ? (
                                <NavLink to="/all-users">Authors</NavLink>
                            ) : (
                                <NavLink to="/login">Authors</NavLink>
                            )}
                        </div>
                    </div>

                    <div className="homePageCard">
                        <img
                            src={team}
                            alt="#"
                            className="placeHolderImageHome"
                        />
                        <div>
                            <NavLink to="/team">Our Team</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homePageMiddleImage">
                <Highlight />
            </div>
        </div>
    );
};
